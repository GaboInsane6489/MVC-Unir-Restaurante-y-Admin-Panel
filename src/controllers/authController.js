import User from "../models/User.js";
import bcrypt from "bcryptjs";

// Mostrar formulario de login
export const showLogin = (req, res) => {
    res.render("admin/auth/login");
};

// Mostrar formulario de registro
export const showRegister = (req, res) => {
    res.render("admin/auth/register");
};


// Procesar registro
export const registerUser = async (req, res) => {
    const { username, password, role } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword, role });

        await newUser.save();
        res.redirect("/login");
    } catch (error) {
        console.error("Error en registro: ", error);
        res.status(500).send("Error al registrar el usuario");
    }
};

// Procesar el login
export const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(401).send("Usuario no encontrado");

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).send("Contraseña incorrecta");

        req.session.user = {
            id: user._id,
            username: user.username,
            role: user.role,
        };

        // Redirigir según el rol
        if (user.role === "admin") {
            res.redirect("/admin/dashboard");
        } else {
            res.redirect("/client/orders");
        }
    } catch (error) {
        console.error("Error en login: ", error);
        res.status(500).send("Error al iniciar sesión");
    }
};

// Logout
export const logoutUser = (req, res) => {
    req.session.destroy(() => {
        res.redirect("/login");
    });
};
