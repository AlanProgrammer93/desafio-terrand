const express = require('express')
const multer = require('multer');
const path = require("path");

const { create, getOwnRecipes, getAllRecipes, edit } = require('../controllers/recipe')
const { authCheck } = require('../middleware/auth');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/recipes');
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage });

const router = express.Router();

router.post('/', [authCheck, upload.single('image')], create);
router.get('/own-recipes', authCheck, getOwnRecipes);
router.get('/', getAllRecipes);
router.post('/edit', [authCheck, upload.single('image')], edit);

module.exports = router;