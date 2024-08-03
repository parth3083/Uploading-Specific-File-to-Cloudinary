// uploadRoute.js
const express = require('express');
const { v2: cloudinary } = require('cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_CLOUD_API_KEY, 
  api_secret: process.env.CLOUDINARY_CLOUD_SECRET, 
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads',
    resource_type: 'raw', 
    format: async (req, file) => {
      const ext = file.originalname.split('.').pop();
      console.log(ext);
      return ext; 
    },
  },
});


const upload = multer({ 
  storage: storage,
  fileFilter: (req, file, cb) => {
    console.log('File filter called:', file.originalname); // Log the name of the file being checked
    const filetypes = /pdf|ppt|pptx/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(file.originalname.split('.').pop());
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb("Error: File upload only supports the following filetypes - " + filetypes);
  }
});

const router = express.Router();


router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    console.log('Request Body:', JSON.stringify(req.body, null, 2)); // Log the entire request body
    console.log('Uploaded File Info:', JSON.stringify(req.file, null, 2)); // Log detailed file info

    if (req.file) {
      console.log('Upload successful:', JSON.stringify(req.file, null, 2)); // Log successful upload info
      res.status(200).json({ url: req.file.path, public_id: req.file.filename });
    } else {
      console.log('Upload failed:', req.file); // Log file info in case of failure
      res.status(400).json({ message: 'File upload failed' });
    }
  } catch (error) {
    console.error('Error during file upload:', error); // Log the full error object
    res.status(500).json({ message: 'Internal Server Error' });
  }
});






module.exports = router;

