import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import session from "express-session"; // ← Middleware de sesión
import { fileURLToPath } from "url";

import authRoutes from "./routes/auth.js";
import mainRoutes from "./routes/index.js";

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Conectado a MongoDB"))
  .catch((err) => console.error("❌ Error al conectar MongoDB:", err));

const app = express();
const _dirname = path.dirname(fileURLToPath(import.meta.url));

app.set("view engine", "ejs");
app.set("views", path.join(_dirname, "views"));

app.use(express.static(path.join(_dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/* 🧠 Configuración de sesión */
app.use(
  session({
    secret: "restaurante-premium", 
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }, // Cambia a true si usas HTTPS
  })
);

/* 🛣️ Rutas */
app.use("/", mainRoutes);
app.use("/", authRoutes);

/* 🟢 Arranque del servidor */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`🚀 Servidor iniciado en http://localhost:${PORT}`)
);




