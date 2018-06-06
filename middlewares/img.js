// Imports the Google Cloud client library
const Storage = require('@google-cloud/storage');

// Your Google Cloud Platform project ID
const projectId = 'erwar-demo';
const cloudBucket = 'super-fox'
// Creates a client
const storage = new Storage({
  projectId: projectId,
  keyFilename: 'erwar-demo-58c77036e2f6.json'
});

// The name for the new bucket
const bucketName = storage.bucket(cloudBucket);

const getPublicUrl = (filename) => {
    return `https://storage.googleapis.com/${cloudBucket}/${filename}`
}

const sendUploadToGCS = (req, res, next) => {
    if (!req.file) {
      return next('file gagal upload')
    }
    //naming file 
    const gcsname = Date.now() + req.file.originalname
    const file = bucketName.file(gcsname)
  
    const stream = file.createWriteStream({
      metadata: {
        contentType: req.file.mimetype
      }
    })
  
    stream.on('error', (err) => {
      console.log(err)
      req.file.cloudStorageError = err
      next(err)
    })
  
    stream.on('finish', () => {
      req.file.cloudStorageObject = gcsname
      file.makePublic().then(() => {
        req.file.cloudStoragePublicUrl = getPublicUrl(gcsname)
        next()
      })
    })
  
    stream.end(req.file.buffer)
  }
  
  const Multer = require('multer'),
        multer = Multer({
          storage: Multer.memoryStorage(),
          limits: {
            fileSize: 5 * 1024 * 1024
          }
          // dest: '../images'
        })
  
  module.exports = {
    getPublicUrl,
    sendUploadToGCS,
    multer
  }
  