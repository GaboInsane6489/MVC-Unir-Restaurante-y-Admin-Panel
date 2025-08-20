import { Router } from "express";
import { requireRole } from "../middlewares/requireRole.js"; // ← Nuevo middleware

const router = Router();

/* ===================== 🧑‍💼 CUSTOMER ROUTES ===================== */
import { listCustomer } from "../controllers/customerController.js";
router.get("/manage", requireRole("admin"), listCustomer);

/* ===================== 📦 ORDER ROUTES ===================== */
import {
  createOrder,
  updateStatus,
  listOrders,
  listOrderByCustomer,
  cleanupDelivered,
} from "../controllers/orderController.js";

router.post("/orders", createOrder);
router.post("/orders/:id/status", requireRole("admin"), updateStatus);
router.post("/admin/cleanup", requireRole("admin"), cleanupDelivered);
router.get("/api/orders/customer/:id", requireRole("admin"), listOrderByCustomer);

/* ===================== 🍽️ MENU ROUTES ===================== */
import { CreatePlate, ListMenu, selectMenu } from "../controllers/menuController.js";

router.post("/admin/menu", requireRole("admin"), CreatePlate);
router.get("/admin/menu", requireRole("admin"), ListMenu);
router.get("/api/menu", selectMenu);

/* ===================== 📊 DASHBOARD ROUTES ===================== */
import { renderDashboard } from "../controllers/dashboardController.js";
router.get("/admin/dashboard", requireRole("admin"), renderDashboard);

/* ===================== 🧾 CLIENT VIEW ===================== */
import Order from "../models/order.js";
router.get("/client/orders", async (req, res) => {
  try {
    const userId = req.session.user?.id;
    const orders = await Order.find({ customer: userId }).sort("-createdAt");
    res.render("client/orders", { orders });
  } catch (err) {
    console.error("Error al cargar órdenes del cliente:", err);
    res.status(500).send("Error al cargar tus órdenes.");
  }
});

/* ===================== 🏠 HOME ROUTE ===================== */
router.get("/", (req, res) => {
  res.render("home", { user: req.session.user });
});

export default router;




