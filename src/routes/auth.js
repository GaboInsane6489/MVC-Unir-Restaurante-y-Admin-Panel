import { Router } from "express";
import {
    showLogin,
    showRegister,
    registerUser,
    loginUser,
    logoutUser
} from "../controllers/authController.js";

const router = Router();

/* ===================== 🔐 AUTH ROUTES ===================== */

/*
    Mostrar formulario de login
    GET /login
*/
router.get("/login", showLogin);

/*
    Mostrar formulario de registro
    GET /register
*/
router.get("/register", showRegister);

/*
    Procesar registro de usuario
    POST /register
*/
router.post("/register", registerUser);

/*
    Procesar inicio de sesión
    POST /login
*/
router.post("/login", loginUser);

/*
    Cerrar sesión del usuario
    GET /logout
*/
router.get("/logout", logoutUser);

export default router;
