// This file contains route handlers for the following routes
// /login, /signup, /submissions
// These handlers will utilize instances of sequelize models to query the database directly

const db = require('../db/index.js');
const bcrypt = require('bcrypt');
const sendmail = require('sendmail')();

module.exports = {
  signup: {
    // creates a new user or finds an already existing user
    // ***TODO***: handle incorrect pw but pre-existing user
    post: (req, res) => {
      bcrypt.hash(req.body.hash, 10, (err, hash) => {
        if (err) {
          console.log('Error hashing password ', err);
          res.sendStatus(400);
        }
        db.User.findOrCreate({
          where: {
            username: req.body.username,
            hash,
            salt: req.body.salt,
            account_type: req.body.account_type,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
          },
        })
          .spread((created) => {
            res.sendStatus(created ? 201 : 200);
          })
          .catch((error) => {
            console.log('ERROR creating record with', error);
            res.sendStatus(400);
          });
      });
    },
  },

  login: {
    // authenticate user, verifying username and hashed pw match
    post: (req, res) => {
      db.User.findOne({
        where: {
          username: req.body.username,
        },
      })
        .then((user) => {
          bcrypt.compare(req.body.hash, user.get('hash'), (err, result) => {
            if (result) {
              res.status(201).json({ username: user.get('username'), account_type: user.get('account_type') });
            } else {
              res.sendStatus(400);
            }
          });
        })
        .catch((err) => {
          console.log('Bad request with error:', err);
          res.sendStatus(400);
        });
    },
  },
  submissions: {
    // send a specific user's messages or all messages for an admin
    get: (req, res) => {
      if (req.query.account_type === 'admin' || req.query.account_type === 'responder') {
        db.Submission.findAll()
          .then((allMessages) => {
            res.status(200).send(allMessages);
          })
          .catch((err) => {
            console.log('Error fetching msgs for admin with', err);
            res.sendStatus(404);
          });
      } else {
        db.User.findOne({
          where: {
            username: req.query.username,
          },
        })
          .then(user => (
            db.Submission.findAll({
              where: {
                // Note: userId is the FK in the submission model that points to a particular user
                userId: user.get('id'),
                // admin_response: {
                //   [Op.not]: null
                // }
              },
            })
          ))
          .then((userMessages) => {
            res.status(200).json(userMessages);
          })
          .catch((err) => {
            console.log('Error fetching msgs for user with', err);
            res.sendStatus(404);
          });
      }
    },
    // write a message to the db associated with a particular user
    post: (req, res) => {
      // find user by username
      db.User.findOne({
        where: {
          username: req.body.username,
        },
      })
        .then(user => (
          // create a submission record tied to that particular user
          db.Submission.create({
            userId: user.get('id'),
            user_message: req.body.user_message,
            user_contact: req.body.user_contact,
            user_urgency: req.body.user_urgency,
            first_name: user.get('first_name'),
            last_name: user.get('last_name'),
          })
        ))
        .then(() => {
          db.User.findAll({
            attributes: ['email'],
          })
            .then((users) => {
              users.forEach((user) => {
                if (user.dataValues.email !== null || user.dataValues.email !== '') {
                  sendmail({
                    from: 'no-reply@sesame.com',
                    to: user.dataValues.email,
                    subject: 'A new submission was made',
                    html: 'Go to this url to check the submission https://sesa-me.herokuapp.com/admin',
                  }, (err, reply) => {
                    console.log('SENDMAIL ERR ', err && err.stack);
                    console.dir('SM REPLY ', reply);
                  });
                }
              });
              res.sendStatus(201);
            });
        })
        .catch((err) => {
          console.log('Error creating user message with', err);
          res.sendStatus(400);
        });
    },
    // allows an admin to edit most recent submission associated with a user
    patch: (req, res) => {
      db.Submission.findOne({
        where: {
          id: req.body.id,
        },
      })
        // update that message with admin's response
        .then(message => (
          message.update({
            admin_response: req.body.admin_response || 'Case marked as complete',
            admin_complete: req.body.admin_complete,
          })
        ))
        .then(() => {
          res.sendStatus(201);
        })
        .catch((err) => {
          console.log('Error amending user message with', err);
          res.sendStatus(400);
        });
    },
  },
  users: {
    get: (req, res) => {
      db.User.findAll()
        .then(users => res.send(users));
    },
    patch: ({ body: { id, account_type } }, res) => {
      db.User.update({ account_type }, { where: { id }, fields: ['account_type'] })
        .then(() => res.end());
    },
  },
  email: {
    patch: ({ body: { username, email } }, res) => {
      db.User.update({ email }, { where: { username }, fields: ['email'] })
        .then(() => res.end());
    },
  },
};
