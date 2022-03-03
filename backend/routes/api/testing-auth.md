# testing auth in api routes
// const asyncHandler = require('express-async-handler');
// const { setTokenCookie } = require('../../utils/auth');
// const { User } = require('../../db/models');


router.get('/set-token-cookie', asyncHandler(async(_req, res) => {
  const user = await User.findOne({
    where: {
      username: 'Demo'
    }
  });
  setTokenCookie(res, user);
  return res.json({ user });
}));

//GET /api/restore-user
const { restoreUser } = require('../../utils/auth');
router.get(
  '/restore-user',
  restoreUser,
  (req, res) => {
    return res.json(req.user);
  }
);

//GET /api/require-auth
const { requireAuth } = require('../../utils/auth');
router.get(
  '/require-auth',
  requireAuth,
  (req, res) => {
    return res.json(req.user);
  }
);
