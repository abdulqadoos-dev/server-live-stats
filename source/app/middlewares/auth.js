const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    let token =
        req.body.token || req.query.token || req.header('authorization');
    if (!token) {
        return res.status(403).send({
            status: 'error',
            message: "A token is required for authentication"
        });
    }
    try {
        token = token.split(" ");
        req.user = jwt.verify(token[1], process.env.APP_KEY);
    } catch (err) {
        return res.status(401).send({
            status: 'error',
            message: "Invalid Token"
        });
    }
    return next();
};

module.exports = verifyToken;