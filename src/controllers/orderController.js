//import { name } from "ejs";
import Order from "../models/order.js";
import { findOrCreateCustomer } from "./customerController.js";

export const createOrder = async (req, res) => {
    try{
        const{tableNumber, description, name} = req.body;

        // Validar datos básicos
        if (!tableNumber || !description || !name) {
            return res.status(400).json({ success: false, message: "Faltan datos obligatorios." });
        }

        //Buscar o crear cliente
        const customer = await findOrCreateCustomer(name);

        //Crear Orden
        await Order.create({
            tableNumber,
            description,
            customer: customer._id, //usando el ObjectID del cliente
        });
        res.redirect("/");
    }catch (error) {
        console.error("Error al crear orden:", error);
            res.status(500).send('Error mientras creaba la orden: "' + error.message)
    }
}   

export const updateStatus = async (req, res) => {
    const { id} = req.params;
    const { status } = req.body;

    await Order.findByIdAndUpdate(id, {status});
    res.redirect("/manage");
}

export const listOrderByCustomer = async (req, res) => {
    const { id } = req.params;
    const orders = await Order.find({ customer: id }).sort("-createdAt");
    res.json(orders);
}

// Exportar función que lista todas las órdenes
export const listOrders = async (req, res) => {
    try {
        const orders = await Order.find()
        .populate("customer")      // ← Añade los datos del cliente
        .sort("-createdAt");       // ← Orden descendente por fecha de creación

        res.json(orders);            // Puedes cambiar a res.render si estás usando EJS
    } catch (error) {
        console.error("Error al listar órdenes:", error);
        res.status(500).send("Error al obtener las órdenes.");
    }
};
