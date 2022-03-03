//backend/routes/api/index.js
//imports
const router = require('express').Router();
const sessionRouter = require('./session');
const usersRouter = require('./users');

router.use('/session', sessionRouter);
router.use('/users', usersRouter);


//routes
// router.post('/test', function(req, res) {
//   res.json({ requestBody: req.body });
// });



module.exports = router;
