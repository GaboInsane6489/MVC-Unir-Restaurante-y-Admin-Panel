import menuItem from "../models/menuItem.js";

export const CreatePlate = async (req, res) => {
    try {
        const { name, price } = req.body;
        //Validar que son solo numeros positivos
        if (price < 0) {
            return res.status(500).json({
                error: "El dato ingresado debe ser un número positivo",
            });
        }

        //Validar que llega algo
        if (name && price) await menuItem.create({ name, price }); //crear el documento dentro del modelo
        res.redirect("/admin/menu");
    } catch (err) {
        console.log("ERROR DE CONEXION: ", err);
    }
};

//El _ indica que uno de los parametros no se va a utilizar
export const ListMenu = async (_, res) => {
    try {
        const items = await menuItem.find().sort("name");

        res.render("admin/menu", { items });
    } catch (err) {
        console.log("ERROR DE CONEXION: ", err);
    }
};

export const selectMenu = async (_, res) => {
    res.json(await menuItem.find().sort("name"));
};