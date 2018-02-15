const axios = require('axios')

class ImageController {
  static postPicture (req, res) {
   //  axios.post('https://vision.googleapis.com/v1/images:annotate?key=AIzaSyDJhP5ZpSEKUWLRqoYJl1rPHxbn6t-Ziso',
   //     {
   //       "requests":[
   //         {
   //           "image":{
   //             "source":{
   //               "imageUri":
   //                 req.file.cloudStoragePublicUrl
   //             }
   //           },
   //           "features":[
   //             {
   //               "type":"LOGO_DETECTION",
   //               "maxResults":10
   //             }
   //           ]
   //         }
   //       ]
   //     }
   // )
   // .then(response => {
   //   res.send(response.data)
   // })
   // .catch(err => {
   //   console.log(err);
   // })
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
      const labels = results[0].labelAnnotations;
      // console.log(req.file.cloudStoragePublicUrl, 'req file nih');
      // labels.forEach(label => console.log(label.description));
      res.status(200).json({
        message : 'get url image and food name',
        foodName : labels[0].description
        // foodName : labels[0].description,
        // foodImage: req.file.cloudStoragePublicUrl
      })
    })
    .catch(err => {
      console.error('ERROR:', err);
      res.status(404).send({
        msg : 'Cannot get url image and food name',
        err
      })
    });
  }
}

module.exports = ImageController;
