const express = require('express')
const multer = require('multer');

const { create } = require('../controllers/recipe')
const { authCheck } = require('../middleware/auth');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage });

const router = express.Router();

router.post('/', [authCheck, upload.single('image')], create);

module.exports = router;