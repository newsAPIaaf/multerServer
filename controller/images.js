class ImageController {
  static postPicture (req, res) {
    // console.log(req.body, '--------------ini req body');
    // console.log(req.file, '--------------ini req file');
    res.status(200).json({
      ...req.file
    })
  }
}

module.exports = ImageController;