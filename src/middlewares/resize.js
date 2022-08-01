const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const resize = async (req, res, next) => {
  try {
    const {filename: image} = req.file;
    await sharp(req.file.path)
        .resize(300, 300)
        .jpeg({quality: 90})
        .toFile(
            path.resolve(req.file.destination, 'resized', image),
        );
    fs.unlinkSync(req.file.path);
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = resize;
