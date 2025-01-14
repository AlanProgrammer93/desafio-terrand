const express = require('express')
const multer = require('multer');
const path = require("path");

const { create, getOwnRecipes, getAllRecipes, edit, rating, getRecipe } = require('../controllers/recipe')
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
router.get('/:idRecipe', getRecipe);
router.post('/edit', [authCheck, upload.single('image')], edit);
router.put('/rating', authCheck, rating);

module.exports = router;