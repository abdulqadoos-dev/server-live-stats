const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images/users')
    },
    filename: function (req, file, cb) {
        // cb(null, new Date().getTime()+'-'+file.originalname)
        cb(null, file.originalname)
    }
})
const upload = multer({ storage: storage })

module.exports = upload