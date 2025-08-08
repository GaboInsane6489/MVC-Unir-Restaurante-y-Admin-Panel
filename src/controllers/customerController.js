import Customer from "../models/customer.js";

//Buscar o crear un cliente
export const findOrCreateCustomer = async (name) => {
    const nameClaned = name.trim(); // limpiar el nombre
    let customer = await Customer.findOne({ name: nameClaned });

    if (!customer) {
        customer = Customer.create({ name: nameClaned });
        return customer;
    }
    return customer;
};

// listar
export const listCustomer = async (req, res) => {
    try {
        const customers = await Customer.find().sort("-createdAt");

        res.render("manage", { customers }); // ← Aquí se pasa la variable a la vista
    } catch (error) {
        console.error("Error al listar clientes:", error);
        res.status(500).send("Error al cargar la vista de gestión.");
    }
};

