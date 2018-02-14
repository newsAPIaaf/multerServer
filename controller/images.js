const axios = require('axios')
require('dotenv').config()
const Location = require('../models/location')
const Zomato = require('../models/zomato')

class ImageController {
  static postPicture (req, res) {
   // Imports the Google Cloud client libraries
  const vision = require('@google-cloud/vision');

  // Creates a client
  const client = new vision.ImageAnnotatorClient({
    projectId: process.env.PROJECT_ID2,
    keyFilename: process.env.KEYFILE_PATH2
  });

/**
 * (developer): Uncomment the following lines before running the sample.
 */
// const bucketName = 'Bucket where the file resides, e.g. my-bucket';
// const fileName = 'Path to file within bucket, e.g. path/to/image.png';

// Performs label detection on the gcs file
  client
    .logoDetection(`gs://${process.env.BUCKET_NAME2}/images/${req.file.cloudStorageObject}`)
    .then(results => {
      console.log(results);
      const logos = results[0].logoAnnotations;
      // console.log(req.file.cloudStoragePublicUrl, 'req file nih');
      // labels.forEach(label => console.log(label.description));
      res.status(200).json({
        logos : logos[0].description
        // message : 'get url image and food name',
        // foodName : labels[0].description,
        // foodImage: req.file.cloudStoragePublicUrl
      })
    })
    .catch(err => {
      console.error('ERROR:', err);
      res.status(500).json({
        msg : 'Cannot get url image and food name',
        err: err
      })
    });
  }
  
  static restaurantLocator (req, res, labelFromGVision) {
    Location.findLocation()
    .then(resp => {
      // console.log(resp);
      Zomato.search(resp.lattitude, resp.longitude, labelFromGVision)
      .then(result => {
        res.status(200).json({
          msg: 'nearby restaurants with chicken:',
          data: result.data
        })
      })
      .catch(err => {
        res.status(500).json({
          err: err
        })
      })
    })
    .catch(err => {
      console.log(err);
    })
  }
}

module.exports = ImageController;