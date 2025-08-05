// Importamos el enrutador de Express
import { Router } from "express";

import { Router } from "express"; //Solo para importar las rutas que nos da el framwork de express

/**************IMPORTS DE CUSTOMER CONTROLLER ************ */
import {
    listCustomer,
    // deleteUser DD
} from "../controllers/customerController.js";
/*------------------------------------------------------------------- */

/**************IMPORTS DE ORDER CONTROLLER ************ */
import {
    createOrder,
    updateStatus,
    listOrderByCustomer,
    cleanupDelivered,
    // deleteUserOrders, DD
} from "../controllers/orderController.js";
/*------------------------------------------------------------------- */

/**************IMPORTS DE MENU CONTROLLER ************ */
import {
    CreatePlate,
    ListMenu,
    selectMenu,
    // deleteMenuItem, DD
} from "../controllers/menuController.js";
/*------------------------------------------------------------------- */

/**************IMPORTS DE DASHBOARD CONTROLLER ************ */
import { renderDash } from "../controllers/dashboardController.js";
/*------------------------------------------------------------------- */

const router = Router();

// Home routes
router.get("/", (request, response) => response.render("home"));

/**************ROUTES DE CUSTOMER ************ */
//Manage routs
router.get("/manage", listCustomer);
/*------------------------------------------------------------------- */

/**************ROUTES DE ORDER ************ */
//Crear orden
router.post("/orders", createOrder);

//cambiar estado
router.post("/orders/:id/status", updateStatus);

//Borrar los delivered
router.post("/admin/cleanup", cleanupDelivered);

//Listar ordenes del cliente
router.get("/api/orders/:id", listOrderByCustomer);
/*------------------------------------------------------------------- */

/**************ROUTES DE MENU *************/
//Crear platos
router.post("/admin/menu", CreatePlate);

//Select
router.get("/api/menu", selectMenu);

//Listar los platos creados
router.get("/admin/menu", ListMenu);
/*------------------------------------------------------------------- */

/**************ROUTES DE DASHBOARD ************ */
//Ruta del admin
router.get("/admin/dashboard", renderDash);
/*------------------------------------------------------------------- */

export default router;


