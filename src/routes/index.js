import { Router } from "express";
const router = Router();

/* ===================== 🧑‍💼 CUSTOMER ROUTES ===================== */
import { listCustomer } from "../controllers/customerController.js";

router.get("/manage", listCustomer);

/* ===================== 📦 ORDER ROUTES ===================== */
import {
  createOrder,
  updateStatus,
  listOrders,
  listOrderByCustomer,
  cleanupDelivered
} from "../controllers/orderController.js";

router.post("/orders", createOrder);
router.post("/orders/:id/status", updateStatus);
router.post("/admin/cleanup", cleanupDelivered);
router.get("/api/orders/customer/:id", listOrderByCustomer);

/* ===================== 🍽️ MENU ROUTES ===================== */
import {
  CreatePlate,
  ListMenu,
  selectMenu
} from "../controllers/menuController.js";

router.post("/admin/menu", CreatePlate);
router.get("/admin/menu", ListMenu);
router.get("/api/menu", selectMenu);

/* ===================== 📊 DASHBOARD ROUTES ===================== */
import { renderDashboard } from "../controllers/dashboardController.js";

router.get("/admin/dashboard", renderDashboard);

/* ===================== 🏠 HOME ROUTE ===================== */
router.get("/", (req, res) => res.render("home"));

export default router;



