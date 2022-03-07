//backend/routes/api/index.js
//imports
const router = require('express').Router();
const sessionRouter = require('./session');
const usersRouter = require('./users');
const businessesRouter = require('./businesses.js');

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/businesses', businessesRouter);


//routes
// router.post('/test', function(req, res) {
//   res.json({ requestBody: req.body });
// });



module.exports = router;
