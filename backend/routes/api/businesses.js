//backend/routes/api/businesses.js
const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Business, Review, Image } = require('../../db/models');

const router = express.Router();

//MIDDLEWARE
const validateBusiness = [
    check('name')
        .exists({ checkFalsy: true })
        .isLength({ min: 5, max: 50 })
        .withMessage('Please provide a name for your business.  Name must be between 5 and 50 characters long.'),
    check('address')
        .exists({ checkFalsy: true })
        .isLength({ min: 10, max: 95 })
        .withMessage('Please provide an address with a length between 10 and 95 characters long.'),
    check('city')
        .exists({ checkFalsy: true })
        .isLength({ min: 3, max: 100 })
        .withMessage('Please enter a valid city between 3 and 100 characters long.'),
    check('state')
        .exists({ checkFalsy: true })
        .isLength({ min: 2, max: 2 })
        .withMessage('Please enter a state.'),
    check('zipCode')
        .exists({ checkFalsy: true })
        .isLength({ min: 5, max: 5 })
        .isNumeric()
        .withMessage('Please enter a valid zipcode'),
    check('phone')
        .exists({ checkFalsy: true })
        .isLength({ min: 10, max: 10 })
        .isNumeric()
        .withMessage('Please enter a valid phone number.'),
    check('description')
        .exists({ checkFalsy: true })
        .withMessage('Please enter a brief description about your Business.'),
    handleValidationErrors
];

//ROUTES
router.get('/', asyncHandler(async (req, res) => {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    const businesses = await Business.findAll();
    return res.json(businesses);
}));

//CREATE BUSINESS
router.post('/', validateBusiness, asyncHandler(async (req, res) => {
    const { name, address, city, state, zipCode, phone, description, ownerId, businessImg } = req.body;
    const business = await Business.create({
        name, address, city, state, zipCode, phone, description, ownerId, businessImg
    });

    return res.json({ business });
}));

//DELETE BUSINESS
router.delete('/:id(\\d+)', asyncHandler(async (req, res) => {
    const shop = await Business.findByPk(req.params.id);

    const reviews = await Review.findAll({
        where: {
            businessId: req.params.id
        }
    });

    const images = await Image.findAll({
        where: {
            businessId: req.params.id
        }
    });

    if (images) {
        images.forEach(async image => {
            Image.destroy({ where: {id: image.id }});
        });
    }

    if (reviews) {
        reviews.forEach(async review => {
            Review.destroy({ where: {id: review.id}});
        });
    }

    await Business.destroy({ where: { id: shop.id } });
    return res.json(shop.id);

}));

//EDIT BUSINESS
// router.get('/:id(\\d+)/edit', asyncHandler(async(req, res) => {
//     const id = req.params.id;
//     const shop = await Business.findByPk(id);

//     res.json(shop);
// }))
router.put('/:id(\\d+)/edit', validateBusiness, asyncHandler(async (req, res) => {
    const shop = await Business.findByPk(req.params.id);
    const { name, address, city, state, zipCode, phone, description, ownerId, businessImg } = req.body;
    const data = await shop.update({ name, address, city, state, zipCode, phone, description, ownerId, businessImg });
    return res.json(data);
}));

module.exports = router;
