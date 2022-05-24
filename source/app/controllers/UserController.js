const modelInstance = require('./../models/index')
const ExceptionResponse = require("../responses/ExceptionResponse");
const UserModal = modelInstance.user;
const UserService = require('./../services/UserService')
const SuccessWithDataResponse = require("../responses/SuccessWithDataResponse");

const getUsers = async (req, res, next) => {
    try{
        let data;
        if(req.params?.id){
            data = (await UserModal.findAll({where:{id:req.params.id}}))?.[0] || null;
        }else{
            data = await UserModal.findAll();
        }
        return res.status(200).send({
            status: 'success',
            message: 'success',
            data: data
        })
    }catch (err) {
        return res.status(500).send(ExceptionResponse(err.message))
    }
}

const upload_image = async (req, res, next) => {
    try{
        const image = req.file;
        const url = await UserService.save_image(image, req.user.id)
        return res.send(SuccessWithDataResponse({image: url}))
    }catch (err) {
        return res.status(500).send(ExceptionResponse(err.message))
    }
}

module.exports = {
    getUsers, upload_image
}