const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { Review, User, Image, Business } = require('../../db/models');

const router = express.Router();

const validateImage = [
  check('title')
    .exists({ checkFalsy: true })
    .isLength({ min: 5, max: 30 })
    .withMessage('Please provide a title between 5 and 30 characters long.'),
  check('description')
    .exists({ checkFalsy: true })
    .isLength({ min: 10, max: 50 })
    .withMessage('Please provide a description between 10 and 50 characters long.'),
  check('imgUrl')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a valid image URL.'),
    handleValidationErrors
]

//ROUTES
//get all images
router.get('/', asyncHandler(async (req, res) => {
  res.cookie('XSRF-TOKEN', req.csrfToken());
  const images = await Image.findAll({
    include: [User, Business],
  });

  console.log('route get all images', images)
  return res.json(images);
}));

//add an image
router.post('/', validateImage, asyncHandler(async (req, res) => {
  const { title, description, imgUrl, businessId, userId } = req.body;
  const image = await Image.create({ title, description, imgUrl, businessId, userId });

  return res.json(image);
}));






module.exports = router;
