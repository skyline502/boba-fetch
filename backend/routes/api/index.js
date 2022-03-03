//backend/routes/api/index.js
//imports
const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const { setTokenCookie } = require('../../utils/auth');
const { User } = require('../../db/models');

//routes
router.post('/test', function(req, res) {
  res.json({ requestBody: req.body });
});



module.exports = router;
