import User from "../models/User.js";
import bcrypt  from "bcryptjs";

//mostrar formulario de login
export const showLogin = (req, res) => {
    res.render("auth/login");
};

// Procesar registro
export const registerUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword });

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
        if (!user) return res.status(401).send("Usuario no Encontrado");

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).send("Contraseña incorrecta");

        req.session.userId = user._id;
        res.redirect("/dashboard");
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

// Mostrar formulario de registro
export const showRegister = (req, res) => {
    res.render("auth/register"); // Asegúrate de tener esta vista
};

