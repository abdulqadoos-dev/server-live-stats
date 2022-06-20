const modelInstance = require('./../models/index')
const UserModal = modelInstance.user;
const RoleModal = modelInstance.role;
const TeamModal = modelInstance.team;
const ProfileModal = modelInstance.profile;
const SchoolModal = modelInstance.school;
const OptService = require("./OptService")
const jwt = require("jsonwebtoken");
const dateTime = require('./HelperService').getDate()
const UnauthorizedResponse = require('./../responses/UnauthorizedResponse')
const BadRequestResponse = require('./../responses/BadRequestResponse')
const NotFoundResponse = require('./../responses/NotFoundResponse')
const ForbiddenResponse = require('./../responses/ForbiddenResponse')
const RegisterResponse = require('./../responses/RegisterResponse')
const SuccessResponse = require('./../responses/SuccessResponse')
const bcrypt = require("bcrypt");
const saltRounds = 10;
const {Op} = modelInstance.Sequelize

const create = async (req, res) => {
    const { name, email, password, phone, isAgree } = req.body
    if ((await UserModal.findAll({where:{email}}))?.[0]?.id) {
        return res.status(400).send({ validationResults: { email: "Email already taken" } })
    }
    const response = await UserModal.create({ name, email, password:bcrypt.hashSync(password, saltRounds), phone, isAgree })
    const otp = await OptService.generateOtp(response.id)
    OptService.sendOtp(otp, email)
    return res.status(200).send(RegisterResponse({ user: response }))
}

const updateEmailVerified = async (id) => {
    await UserModal.update({ emailVerifiedAt: new Date() }, {where:{id}});
}

const forgetPassword = async (req, res) => {
    const { email } = req.body;
    const user = (await UserModal.findAll({where:{email}}))?.[0];
    if (user) {
        const otp = await OptService.generateOtp(user.id)
        OptService.sendOtp(otp, email)
        return res.status(200).send(RegisterResponse({ user }))
    }
    return res.status(400).send({ validationResults: { email: "Email does not exist" } })
}

const resetPassword = async (req, res) => {
    let signature = req.header('authorization');
    const { password } = req.body;
    if (!signature) {
        return res.status(403).send({ error: "Signature is required" });
    } else if (!password) {
        return res.status(400).send({ validationResults: { password: "Password is required" } });
    }
    signature = signature.split(" ")?.[1]
    let sigData = {};
    try {
        sigData = jwt.verify(signature, process.env.APP_KEY);
    } catch (err) {
        return res.status(403).send({ error: "Invalid signature" });
    }
    const { userId } = sigData;
    await UserModal.update({ password: bcrypt.hashSync(password, saltRounds) }, {where:{id:userId}})
    return res.status(200).send(SuccessResponse('Password reset successfully'))
}

const authenticate = async (email, password) => {
    let user = await UserModal.findAll({where:{
            [Op.or]:[{email:email},{phone:email}],
            emailVerifiedAt:{[Op.lte]:new Date()}
        }, include:[
            {model:RoleModal, as:'role'},
            {model:ProfileModal, as:'profile'},
            {model:TeamModal, as:'team', include:[{model:SchoolModal, as:'school'}]}
        ]})
    user = user?.[0];
    if(user?.password && bcrypt.compareSync(password, user.password)){
        return user;
    }
    return null;
}

const save_image = async (image, id) => {
    image = (image.path.replace(/\\/gi, "/")).replace('public','');
    await UserModal.update({image:image},{where:{id}});
    return image;
}

module.exports = {
    create, updateEmailVerified, forgetPassword, resetPassword, authenticate, save_image
}