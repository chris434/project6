const multer = require('multer')

const mineTypes = {
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg',
    'image/png': 'png',
    'images/bmp': 'bmp'
}
const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, 'images')
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_')
        const extension = mineTypes[file.mimetype]
        callback(null, name + Date.now() + '.' + extension)
    }
})
module.exports = multer({ storage: storage }).single('image')