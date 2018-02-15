const imageController = require('../controller/images')
const GCShelper = require('../middleware/multer')
const Location = require('../models/location')

const express = require('express')
const router = express.Router()

router.post('/',GCShelper.multer.single('image'), GCShelper.sendUploadToGCS, imageController.postPicture)
router.get('/location', imageController.restaurantLocator)

module.exports = router;