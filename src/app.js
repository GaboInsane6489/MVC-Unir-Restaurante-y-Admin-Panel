/********************************************************************
 *  Aplicación Express básica con MVC
 *  ---------------------------------------------------------------
 *  1. Carga variables de entorno
 *  2. Conecta a MongoDB (mongoose)
 *  3. Configura middlewares y vistas (EJS)
 *  4. Monta las rutas
 *******************************************************************/
import express from "express";
// const express = require("express");
import mongoose from "mongoose";
// const mongoose = mongoose;
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import router from "./routes/index.js";

dotenv.config(); // lee .env

/* ----------- Conexión a base de datos -------------------------- */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Conectado a MongoDB"))
  .catch((err) => console.error("❌ Error Mongo:", err));

/* ----------- Configuración de Express -------------------------- */
const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url)); // para obtener el directorio actual

/* ----------- __dirname -------------------------- */
// import.meta.url = Una URL con esquema file:// que apunta al archivo actual. Ejemplo: file:///Users/tuuser/resto-mvc/src/app.js
// fileURLToPath(import.meta.url) = Convierte esa URL en una ruta absoluta de sistema de archivos: /Users/tuuser/resto-mvc/src/app.js
// path.dirname(...) = Extrae solo la carpeta contenedora: /Users/tuuser/resto-mvc/src

app.set("view engine", "ejs"); // motor de plantillas
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public"))); // archivos estáticos
app.use(express.urlencoded({ extended: true })); // leer formularios
app.use(express.json()); // leer JSON

app.use("/", router); // monta todas las rutas

/* ----------- Arranque ------------------------------------------ */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`🚀 Servidor http://localhost:${PORT}`));
