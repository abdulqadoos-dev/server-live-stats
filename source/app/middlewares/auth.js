const jwt = require("jsonwebtoken");
const modelInstance = require('./../models/index')
const UserModal = modelInstance.user;
const RoleModal = modelInstance.role;
const TeamModal = modelInstance.team;
const ProfileModal = modelInstance.profile;
const SchoolModal = modelInstance.school;
const verifyToken = async (req, res, next) => {
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
        req.jwtData = jwt.verify(token[1], process.env.APP_KEY);
        req.user = await UserModal.findOne({where:{id:req.jwtData.userId}, include:[
            {model:RoleModal, as:'role'},
            {model:ProfileModal, as:'profile'},
            {model:TeamModal, as:'team', include:[{model:SchoolModal, as:'school'}]}
        ]})
    } catch (err) {
        return res.status(401).send({
            status: 'error',
            message: "Invalid Token"
        });
    }
    return next();
};

module.exports = verifyToken;