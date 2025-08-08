/********************************************************************
   *  🚀 Aplicación Express con arquitectura MVC
   *  ---------------------------------------------------------------
   *  1. Carga variables de entorno (.env)
   *  2. Conecta a MongoDB usando Mongoose
   *  3. Configura middlewares, vistas (EJS) y archivos estáticos
   *  4. Monta rutas principales y de autenticación
 *******************************************************************/

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath} from "url";

// Rutas
import authRoutes from "./routes/auth.js";
import mainRoutes from "./routes/index.js";
import { error } from "console";

// Cargar variables de entorno
dotenv.config();

/* 🌐 Conexión a MongoDB */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Conectado a MongoDB"))
  .catch((err)=> console.error("❌ Error al conectar MongoDB:", err)) 

/* ⚙️ Configuración de Express */
const app = express();

// Obtener ruta absoluta del directorio actual
const _dirname = path .dirname(fileURLToPath(import.meta.url));

/* 🧩 Configuración de vistas y middlewares */
app.set("view engine", "ejs"); //Motor de plantillas EJS
app.set("views", path.join(_dirname, "views")); // Carpeta de vistas

app.use(express.static(path.join(_dirname, "public")));
app.use(express.urlencoded({ extended: true })) // Formularios (x-www-form-urlencoded)
app.use(express.json()); // Datos en formato JSON

/* 🛣️ Rutas */
app.use("/", mainRoutes);      // Rutas principales
app.use("/auth", authRoutes); // Rutas de login, registro, etc.

/* 🟢 Arranque del servidor */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Servidor iniciado en http://localhost:${PORT}`));



