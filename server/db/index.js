// This file initialize a sequelize instance
// It contains code that defines models, their relationships,
// and creates the tables IF they don't already exist in mysql

const Sequelize = require('sequelize');

const db = new Sequelize(process.env.SESAMEDB, {
  dialect: 'mysql',
});

const User = db.define('user', {
  // id is already created by default as PK
  username: { type: Sequelize.STRING, unique: true },
  hash: Sequelize.STRING,
  salt: Sequelize.STRING,
  account_type: Sequelize.STRING,
  first_name: Sequelize.STRING,
  last_name: Sequelize.STRING,
});


const Submission = db.define('submission', {
  // id (PK), createdAt, and user id (FK) are created by default
  user_message: Sequelize.TEXT,
  user_contact: Sequelize.TEXT,
  user_urgency: Sequelize.INTEGER,
  admin_response: Sequelize.TEXT,
  // Sequelize Boolean will be converted to TINYINT(1)
  admin_complete: Sequelize.BOOLEAN,
  first_name: Sequelize.STRING,
  last_name: Sequelize.STRING,
});

// define 1:many relationship of Users:Submissions
Submission.belongsTo(User);
User.hasMany(Submission);

// create tables if they do not yet exist
User.sync();
Submission.sync();

exports.User = User;
exports.Submission = Submission;
