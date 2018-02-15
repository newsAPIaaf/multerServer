require('dotenv').config()
const Storage = require('@google-cloud/storage')

const storage = Storage({
  projectId: process.env.PROJECT_ID2,
  keyFilename: process.env.KEYFILE_PATH2
})

const bucket = storage.bucket(process.env.BUCKET_NAME2)

const getPublicUrl = (filename) => {
  return `https://storage.googleapis.com/${process.env.BUCKET_NAME2}/images/${filename}`
}

const sendUploadToGCS = (req, res, next) => {
  // console.log(req.body, 'from sendUploadToGCS');
  
  //if (!token) do not enter
  if (!req.file) {
    // console.log(req.body.image);
    return next()
  }
  
  const gcsname = Date.now() + req.file.originalname
  const file = bucket.file('images/'+gcsname)

  const stream = file.createWriteStream({
    metadata: {
      contentType: req.file.mimetype
    }
  })

  stream.on('error', (err) => {
    req.file.cloudStorageError = err
    next(err)
  })

  stream.on('finish', () => {
    req.file.cloudStorageObject = gcsname
    file.makePublic().then(() => {
        console.log("...............................",req.file);
      req.file.cloudStoragePublicUrl = getPublicUrl(gcsname)
      console.log(req.file.cloudStorageObject);
      console.log(req.file.cloudStorageError);
      next()
    })
  })
  //no catch here

  stream.end(req.file.buffer)
}

const Multer = require('multer'),
  multer = Multer({
    storage: Multer.MemoryStorage,
    limits: {
      fileSize: 10 * 1024 * 1024
    }
    // dest: '../images'
  })

module.exports = {
  getPublicUrl,
  sendUploadToGCS,
  multer
}