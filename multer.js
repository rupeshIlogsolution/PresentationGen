const multer = require('multer')
const uploadImg = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "./Public/image/Uploaded")
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname + "-" + Date.now() + ".jpg")
        }
    })

}).array("presentationImg", 12)
module.exports =uploadImg