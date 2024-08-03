const express = require('express');
const { upload } = require('../config/cloudinary');

const router = express.Router();

router.post('/upload', upload.single('file'), (req, res) => {
  if (req.file) {
    res.status(200).json({ url: req.file.path, public_id: req.file.filename });
  } else {
    res.status(400).json({ message: 'File upload failed' });
  }
});

module.exports = router;
