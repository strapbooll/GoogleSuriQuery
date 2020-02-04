const {format} = require('util');
const Multer = require('multer');
const {Storage} = require('@google-cloud/storage');

const storage = new Storage({
    bucket: "suridatabase1",
    projectId: "suridatabase-251912",
    keyFilename: "./src/key.json",
});

const multer = Multer({
    storage: Multer.memoryStorage(),
    limits: {
      fileSize: 5 * 1024 * 1024,
    },
  });
  
  const bucket = storage.bucket("suridatabase1");
  
  app.post('/upload', multer.single('file'), (req, res, next) => {
    if (!req.file) {
      res.status(400).send('No file uploaded.');
      return;
    }
  
    // Create a new blob in the bucket and upload the file data.
    const blob = bucket.file(req.file.originalname);
    const blobStream = blob.createWriteStream();
  
    blobStream.on('error', err => {
      next(err);
    });
  
    blobStream.on('finish', () => {
      // The public URL can be used to directly access the file via HTTP.
      const publicUrl = format(
        `https://storage.googleapis.com/${bucket.name}/${blob.name}`
      );
      res.status(200).send(publicUrl);
    });
  
    blobStream.end(req.file.buffer);
  });