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

        if(req.file) {
            const imagePath = await getFilePath(req.file.image);
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

async function getFilePath(file) {
    const filePath = file.path;

    //  PARA WINDOWS
    const fileSplit = filePath.split("\\");

    //PARA UBUNTU
    // const fileSplit = filePath.split("/");

    return `${fileSplit[1]}/${fileSplit[2]}`;
}