const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { Review, User } = require('../../db/models');

const router = express.Router();

const validateReview = [
  check('rating')
    .exists({ checkFalsy: true })
    .isNumeric()
    .withMessage('Please select a rating between 1 and 5'),
  check('review')
    .exists({ checkFalsy: true })
    .isLength({ min: 20, max: 256 })
    .withMessage('Please leave a review between 20 to 256 characters long.'),
  handleValidationErrors
]

//ROUTES
router.get('/', asyncHandler(async (req, res) => {
  res.cookie('XSRF-TOKEN', req.csrfToken());
  const reviews = await Review.findAll({
    include: User,
  });
  console.log('review list: ', reviews);
  return res.json(reviews);
}));

router.post('/:businessId(\\d+)', validateReview, asyncHandler(async(req, res) => {
  const { userId, businessId, rating, review } = req.body;
  console.log('the request...:', req.body);
  const newReview = await Review.create({ userId, businessId, rating, review });
  console.log('is review posted:', newReview);
  return res.json({newReview});

}))

module.exports = router;
