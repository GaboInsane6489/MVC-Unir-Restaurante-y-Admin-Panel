export const requireRole = (role) => {
    return (req, res, next) => {
        const user = req.session.user;
        if (user && user.role === role) {
            return next();
        }
        return res.status(403).render("403"); // ← Vista premium de acceso denegado
    };
};
