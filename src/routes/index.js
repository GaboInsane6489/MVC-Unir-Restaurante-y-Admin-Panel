// Importamos el enrutador de Express
import { Router } from "express";

// Importamos funciones de controladores
import {
  createOrder,
  updateStatus,
  listOrders,               // ← Lista todas las órdenes
  listOrderByCustomer       // ← Lista órdenes de un cliente específico
} from "../controllers/orderController.js";

import {
  listCustomer              // ← Lista todos los clientes (puede incluirse en un dashboard combinado)
} from "../controllers/customerController.js";

const router = Router();

/* ---------------------- Rutas Públicas ------------------------- */

// Página principal
router.get("/", (req, res) => res.render("home"));

/* -------------------- Gestión del Sistema ---------------------- */

// Vista de gestión (renderiza clientes — puede ampliarse con órdenes en el controlador si usas "listDashboard")
router.get("/manage", listCustomer);

/* --------------------- API de Órdenes -------------------------- */

// Crear una nueva orden desde formulario
router.post("/orders", createOrder);

// Actualizar estado de una orden vía formulario HTML (POST clásico)
router.post("/orders/:id/status", updateStatus);

// Actualizar estado de una orden vía fetch (PUT moderno)
router.put("/api/orders/:id/status", updateStatus);

// Listar todas las órdenes
router.get("/api/orders", listOrders);

// Listar órdenes de un cliente específico
router.get("/api/orders/customer/:id", listOrderByCustomer);


export default router;



