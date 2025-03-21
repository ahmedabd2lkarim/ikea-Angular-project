const adminCategoryMiddleware = (req, res, next) => {
    if (!req.user || req.user.role !== "admin") {
        return res.status(403).json({ message: "Admins only Can Access Category." });
    }
    next();
};

module.exports = adminCategoryMiddleware;
