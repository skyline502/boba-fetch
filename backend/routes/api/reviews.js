const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { Review } = require('../../db/models');

const router = express.Router();

const validateReview = [
  check('rating')
    .exists({ checkFalsy: true })
    .isNumeric()
    .withMessage('Please select a rating between 1 and 5'),
  check('review')
    .exists({ checkFalsy: true })
    .withMessage('Please leave a review'),
  handleValidationErrors
]

//ROUTES
router.get('/:businessId(\\d+)', asyncHandler(async (req, res) => {
  res.cookie('XSRF-TOKEN', req.csrfToken());
  const businessId = req.params.businessId
  const reviews = await Review.findAll({
    where: {
      businessId
    }
  });
  console.log('review list: ', reviews);
  return res.json(reviews);
}))

module.exports = router;
