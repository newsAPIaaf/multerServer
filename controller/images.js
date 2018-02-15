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
    projectId: process.env.PROJECT_ID,
    keyFilename: process.env.KEYFILE_PATH
  });

/**
 * (developer): Uncomment the following lines before running the sample.
 */
// const bucketName = 'Bucket where the file resides, e.g. my-bucket';
// const fileName = 'Path to file within bucket, e.g. path/to/image.png';

// Performs label detection on the gcs file
  client
    .labelDetection(`gs://${process.env.BUCKET_NAME}/images/${req.file.cloudStorageObject}`)
    .then(results => {
      console.log(results);
      const labels = results[0].labelAnnotations;
      // console.log(req.file.cloudStoragePublicUrl, 'req file nih');
      // let arr = []
      // console.log(labels, 'tes');
      // labels.forEach(label => arr.push(label.description));

      Location.findLocation()
      .then(resp => {
        Zomato.search(resp.data.latitude, resp.data.longitude, labels[2].description)
        .then(result => {
          res.status(200).json({
            data: result.data,
            foodName: labels[2].description
          })
        })
        .catch(err => {
          res.send(err)
        })
      })
      .catch(err => {
        res.send(err)
      })
      // res.status(200).json({
      //   labels : labels[0].description
        // message : 'get url image and food name',
        // foodName : labels[0].description,
        // foodImage: req.file.cloudStoragePublicUrl
      // })
    })
    .catch(err => {
      console.error('ERROR:', err);
      res.status(500).json({
        msg : 'Cannot get url image and food name',
        err: err
      })
    });
  }

  // static restaurantLocator (req, res, labelFromGVision) {
  //   Location.findLocation()
  //   .then(resp => {
  //     // console.log(resp);
  //     Zomato.search(resp.latitude, resp.longitude, labelFromGVision)
  //     .then(result => {
  //       res.status(200).json({
  //         msg: 'nearby restaurants with chicken:',
  //         data: result.data
  //       })
  //     })
  //     .catch(err => {
  //       res.status(500).json({
  //         err: err
  //       })
  //     })
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   })
  // }
}

module.exports = ImageController;
