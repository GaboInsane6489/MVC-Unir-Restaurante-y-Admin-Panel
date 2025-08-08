//Importar modelo de orden y función para gestionar clientes
import { name } from "ejs"
import Order from "../models/order.js"
import { findOrCreateCustomer } from "./customerController.js"

/*
    Crear una nueva orden 
*/

export const  createOrder = async (req, res) => {
    try{
        const { tableNumber, description, name } = req.body;

        // Válidar que los datos obligatorios estén presentes
        if ( !tableNumber || !description || !name ) {
            return res.status(400).json({
                succes: false,
                message: "Faltan datos obligatorios: número de mesa, descripción o nombre.",
            });
        }

        // Buscar cliente existente o crear uno nuevo
        const customer = await findOrCreateCustomer(name);

        // Crear la orden asociada al cliente
        await Order.create({
            tableNumber,
            description,
            customer: customer._id,
        });

        // Redirigir al home tras crear la orden ( Util en EJS )
        res.redirect("/");
    }catch (error) {
        console.error("Error al crear la orden:", error);
        res.status(500).json({
            succes: false,
            message: "Error al crear la orden",
            error: error.message,
        });
    }
};

/*
    Actualizar el estado de una orden
*/

export const updateStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try{
        // Actualizar el estado de la orden por ID
        const update = await Order.findByIdAndUpdate(id, {status});

        // Si no se encuentra la orden, devolver 404
        if (!update) {
            return res.status(400).json({
                succes: false,
                message: "Orden no encontrada.",
            });
        }
        // Redirigir al panel de gestión tras actualizar
        res.redirect("/manage");
    } catch (error) {
        console.error("Error al actualizar estado: ", error);
        res.status(500).json({
            succes: false,
            message: "Error al actualizar el estado de la orden.",
            error: error.message,
        });
    }
};

/*
    Listar ordenes por clientes
*/ 

import mongoose from "mongoose";

export const listOrderByCustomer = async (req, res) => {
    const { id } = req.params;

    // Validar si el ID es un ObjectId válido
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            success: false,
        message: "ID de cliente inválido.",
        });
    }

    try {
        const orders = await Order.find({ customer: new mongoose.Types.ObjectId(id) }).sort("-createdAt");

        if (!orders.length) {
            return res.status(404).json({
                success: false,
                message: "No se encontraron órdenes para este cliente.",
            });
        }

        res.status(200).json({
            success: true,
            orders,
        });
    } catch (error) {
        console.error("Error al listar órdenes por cliente:", error);
        res.status(500).json({
            success: false,
            message: "Error interno del servidor.",
            error: error.message,
        });
    }
};

/*
    Listar todas las órdenes
*/

export const listOrders = async (req, res) => {
    try {
        // Buscar todas las órdenes y poblar datos del cliente
        const orders = await  Order.find()
        .populate("customer")
        .sort("-createdAt");

        res.status(200).json({
            succes: true,
            orders,
        });
    } catch (error) {
        console.error("Error al listar las órdenes: ", error);
        res.status(500).json({
            succes: false,
            message: "Error al obtener las órdenes.",
            error: error.message,
        });
    }
};

/*
    Eliminar todas las órdenes con estado Entregado
*/ 

export const cleanupDelivered = async (req, res) => {
    try {
        // Eliminar todas las órdenes marcadas con "Entregado"
        const result = await Order.deleteMany({ status: "Entregado" });

        res.status(200).json({
            succes: true,
            message: `Se eliminaron ${result.deleteCount} órdenes entregadas.`,
        });
    } catch (error) {
        console.error("Error al limpiar órdenes entregadas.", error);
        res.status(500).json({
            succes: false,
            message: "Error al limpiar órdenes entregadas",
            error: error.message,
        });
    }
};
