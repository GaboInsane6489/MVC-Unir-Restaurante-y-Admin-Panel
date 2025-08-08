import Order from "../models/order.js";

export const renderDashboard = async (_, res) => {
    try {
        const raw = await Order.aggregate([
        { $group: { _id: "$status", total: { $sum: 1 } } },
        ]);

        const counts = { todo: 0, done: 0, delivered: 0 };
        raw.forEach(r => {
            counts[r._id] = r.total;
        });

        res.render("admin/dashboard", { counts }); // ← Enviamos los datos a la vista
    } catch (error) {
        console.error("Error rendering dashboard:", error);
        res.status(500).render("dashboard", { counts: null, error: true });
    }
};




