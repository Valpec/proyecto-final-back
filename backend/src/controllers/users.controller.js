import { userService } from "../services/service.js"


const putPremiumUserController = async(req, res) => {
    try{
        let user = await userService.changeRoleUser(req.params.uid)
        res.status(201).send({message: "Rol de usuario actualizado con exito"});

    }catch(error){
        res.status(500).send({error: "500", message: "No se pudo actualizar la informacion del usuario"});
    }

}

const resetPassword = async(req, res) => {
    try{
        const token = req.params.token
        const {newPassword} = req.body
        console.log('entra por aca')
        console.log(token, newPassword)
        let user = await userService.changePassword(token, newPassword)
        res.status(201).send({message: "Rol de usuario actualizado con exito"});

    }catch(error){
        res.status(500).send({error: "500", message: "No se pudo actualizar la informacion del usuario"});
    }

}

const postDocumentController = async(req, res)=>{
    try{
        console.log('entra')
        let user = await userService.uploadFiles(req)
        res.status(200).send({message: "Documentacion cargada exitosamente"});
    }catch(error){
        res.status(500).send({error: "500", message: "No se pudo actualizar la informacion del usuario"});
    }
}

const getUsers = async(req, res)=>{
    try{
        const users = await userService.findAllUsers()

        const usersModded = users.map(user => {
            return {
                id: user._id,
                fullName: user.firstName +' '+user.lastName,
                email: user.email,
                role: user.role
            }
        })
        res.status(200).send(usersModded);
    }catch(error){
        res.status(500).send({error: "500", message: `No se pudo obtener la informacion del usuario ${error}`});
    }
}

const deleteUsers = async(req, res)=>{
    try{
        const users  = await userService.findAllUsers()
        const usersDeleted = await userService.deleteInactiveUseres(users)

        res.status(200).send({message: "Usuarios eliminados existosamente"});
    }catch(error){
        res.status(500).send({error: "500", message: "No se pudo actualizar la informacion del usuario"});
    }
}

export {putPremiumUserController, resetPassword, postDocumentController, getUsers, deleteUsers}