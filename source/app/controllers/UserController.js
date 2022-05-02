const modelInstance = require('./../models/index')
const UserModal = modelInstance.user;

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
        return res.status(500).send({
            status: 'error',
            message:err.message
        })
    }
}

module.exports = {
    getUsers
}