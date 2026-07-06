const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {

    let token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Access Denied"
        });
    }

    token = token.replace("Bearer ", "");

    try {

        const verified = jwt.verify(token, process.env.JWT_SECRET);

        req.user = verified;

        next();

    } catch (error) {

        res.status(401).json({
            success: false,
            message: "Invalid Token"
        });

    }

};

module.exports = authMiddleware;
