const imageController = require('../controller/images')
const GCShelper = require('../middleware/multer')

const express = require('express')
const router = express.Router()

router.post('/',GCShelper.multer.single('image'), GCShelper.sendUploadToGCS, imageController.postPicture)

module.exports = router;