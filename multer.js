const multer = require('multer')
let fileData;
const uploadImg = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "./Public/image/Uploaded")
        },
        filename: function (req, file, cb) {
            fileData = file;
            cb(null, file.originalname + "-" + Date.now() + ".jpg")
        }
    })

}).array("presentationImg", 12)
module.exports = {uploadImg,fileData}