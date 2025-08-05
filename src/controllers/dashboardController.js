import Order from "../modelsorder.js"

export const renderDashboard = async (_, res) => {
    try {
        const raw = await Order.aggregate([
            {
                $group: { _id: "$status", total: { $sum: 1 } },
            },
        ]);

        // Inicializamos con valores por defecto
        const counts = { todo: 0, done: 0, delivered: 0 };

        raw.forEach(r => {
            counts[r._id] = r.total;
        });

        res.status(200).json({ statusCounts: counts });
    } catch (error) {
        console.error("Error rendering dashboard:", error);
        res.status(500).json({ error: "Failed to render dashboard" });
    }
};

    //Estructura base 
    // Crearemos un onjeto con las tres categorías predefinidas
    //todos a 0, esto evita que  sea undefinedpor si aun no existe en la BD
    const counts = { todo: 0, done: 0, delivered: 0 };

    // Recorreremos los resultados y los rellenamos: por ejemplo count
    raw.forEach(r => {
        counts[r._id] = r.total;
    });

