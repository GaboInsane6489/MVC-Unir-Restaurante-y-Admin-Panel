// Importamos el enrutador de Express
import { Router } from "express";
const router = Router(); // ✅ Inicializado antes de usar

/**************IMPORTS DE CUSTOMER CONTROLLER ************ */
import {
  listCustomer,
  // deleteUser // ← pendiente
} from "../controllers/customerController.js";

/**************IMPORTS DE ORDER CONTROLLER ************ */
import {
  createOrder,
  updateStatus,
  listOrders,
  listOrderByCustomer,
  cleanupDelivered
} from "../controllers/orderController.js";

/**************IMPORTS DE MENU CONTROLLER ************ */
import {
  CreatePlate,
  ListMenu,
  selectMenu,
  // deleteMenuItem // ← pendiente
} from "../controllers/menuController.js";

/**************IMPORTS DE DASHBOARD CONTROLLER ************ */
import { renderDashboard } from "../controllers/dashboardController.js";

/*------------------------------------------------------------------- */

/************** HOME ROUTES ************ */
router.get("/", (req, res) => res.render("home"));

/************** ROUTES DE CUSTOMER ************ */
router.get("/manage", listCustomer);

/************** ROUTES DE ORDER ************ */
router.post("/orders", createOrder);
router.post("/orders/:id/status", updateStatus);
router.post("/admin/cleanup", cleanupDelivered);
router.get("/api/orders/customer/:id", listOrderByCustomer);

/************** ROUTES DE MENU ************ */
router.post("/admin/menu", CreatePlate);
router.get("/api/menu", selectMenu);
router.get("/admin/menu", ListMenu);

/************** ROUTES DE DASHBOARD ************ */
router.get("/admin/dashboard", renderDashboard); // ✅ corregido nombre del handler

/*------------------------------------------------------------------- */

export default router;



