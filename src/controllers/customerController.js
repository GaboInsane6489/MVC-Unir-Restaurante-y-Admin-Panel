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
    // let bodyC = req.body;

    const customerItems = await Customer.find().sort("name");

    return res.render("manage", { customerItems });
};

