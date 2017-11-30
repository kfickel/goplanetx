// This file sets up express router
const controller = require('./controllers/index.js');
const router = require('express').Router();


// router.get('/login', controller.login.get);
router.post('/login', controller.login.post);

// router.get('/signup', controller.signup.get);
router.post('/signup', controller.signup.post);

router.get('/submissions', controller.submissions.get);
router.post('/submissions', controller.submissions.post);
router.patch('/submissions', controller.submissions.patch);

router.get('*', (req, res) => {
  res.sendFile('index.html', { root: `${__dirname}/../client/dist/` });
});

module.exports = router;
