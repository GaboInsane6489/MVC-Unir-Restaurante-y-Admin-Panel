import Customer from "../models/customer.js";

export const findOrCreateCustomer = async (name) => {
  const nameCleaned = name.trim();
  let customer = await Customer.findOne({ name: nameCleaned });
  if (!customer) {
    customer = await Customer.create({ name: nameCleaned }); // ← Falta await
  }
  return customer;
};

export const listCustomer = async (req, res) => {
  const customers = await Customer.find().sort("name");
  res.render("manage", { customers });
};
