const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];  
    if (!token) return res.status(403).json({ message: "Token is required" });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) return res.status(403).json({ message: "Invalid token" });
      req.user = decoded;   
      next();
    });
  } catch (err) {
    res.status(403).json({ message: "Authentication failed" });
  }
};

module.exports = authenticate;
