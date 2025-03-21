const checkRole = (requiredRole) => {
    return (req, res, next) => {
      if (!req.user || !req.user.role) {
        return res.status(403).json({ message: "Access denied" });
      }
      if (req.user.role !== requiredRole) {
        return res.status(403).json({ message: `Access denied: Only ${requiredRole}s allowed` });
      }
      next();
    };
  };
  
  module.exports = checkRole;
  