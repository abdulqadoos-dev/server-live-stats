const UserModal = require('./../models/User')

const getUsers = async (req, res, next) => {
    try{
        let data;
        if(req.params.id){
            data = await UserModal.get(`id = ${req.params.id}`);
        }else{
            data = await UserModal.get();
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