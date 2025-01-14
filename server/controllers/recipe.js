const Recipe = require("../models/Recipe");

exports.create = async (req, res) => {

    const { name, description, ingredients } = req.body;
    const userId = req.userId;

    try {
        const newRecipe = new Recipe({
            postedBy: userId,
            name,
            description,
            ingredients
        });

        if (req.file) {
            const imagePath = await getFilePath(req.file);

            newRecipe.image = imagePath
        }

        await newRecipe.save();

        return res.status(200).json({
            msg: 'Receta Creada Correctamente.'
        });
    } catch (error) {
        return res.status(500).json({
            msg: 'Ocurrio un problema en el servidor.'
        });
    }
}

exports.edit = async (req, res) => {
    const { id, name, description, ingredients } = req.body;
    const userId = req.userId;

    const recipe = await Recipe.findById(id)

    if (!recipe) {
        return res.status(404).send({ msg: 'No existe la receta.' });
    }

    if (recipe.postedBy.toString() !== userId) {
        return res.status(400).json({
            msg: "No tienes permiso para editar la receta.",
        });
    }

    try {
        recipe.name = name
        recipe.description = description
        recipe.ingredients = ingredients

        if (req.file) {
            const imagePath = await getFilePath(req.file);
            recipe.image = imagePath
        }

        await recipe.save();

        return res.status(200).json({
            msg: 'Receta Editada Correctamente.'
        });
    } catch (error) {
        return res.status(500).json({
            msg: 'Ocurrio un problema en el servidor.'
        });
    }
}

exports.getOwnRecipes = async (req, res) => {
    try {
        const userId = req.userId

        const recipes = await Recipe.find({ postedBy: userId }).sort({ createdAt: -1 });

        return res.status(200).json({
            recipes
        });
    } catch (error) {
        return res.status(500).json({
            msg: 'Ha ocurrido un error interno.'
        });
    }
}

exports.getAllRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find()
            .populate("postedBy", "_id name lastname")
            .populate("ratings.ratingBy", "_id name lastname")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            recipes
        });
    } catch (error) {
        return res.status(500).json({
            msg: 'Ha ocurrido un error interno.'
        });
    }
}

exports.getRecipe = async (req, res) => {
    const idRecipe = req.params.idRecipe;
    try {
        const recipe = await Recipe.findById(idRecipe)

        return res.status(200).json({
            recipe
        });
    } catch (error) {
        return res.status(500).json({
            msg: 'Ha ocurrido un error interno.'
        });
    }
}

exports.rating = async (req, res) => {
    const { id, value } = req.body;
    const userId = req.userId;

    try {
        const recipe = await Recipe.findById(id);

        const existingRating = recipe.ratings.find((r) => r.ratingBy.toString() === userId);

        if (existingRating) {
            await Recipe.updateOne(
                {
                    _id: id,
                    "ratings.ratingBy": userId,
                },
                {
                    $set: { "ratings.$.rating": value },
                }
            )
        } else {
            await Recipe.findByIdAndUpdate(
                id,
                {
                    $push: {
                        ratings: {
                            ratingBy: userId,
                            rating: value,
                        },
                    },
                }
            )
        }

        return res.status(200).json({
            msg: 'Puntuacion Guardada Correctamente.'
        });
    } catch (error) {
        return res.status(500).json({
            msg: 'Ha ocurrido un error interno.'
        });
    }
}

async function getFilePath(file) {
    const filePath = file.path;

    //  PARA WINDOWS
    const fileSplit = filePath.split("\\");

    //PARA UBUNTU
    // const fileSplit = filePath.split("/");

    return `${fileSplit[1]}/${fileSplit[2]}`;
}