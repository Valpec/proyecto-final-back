export default class UserRepository {
    constructor(dao) {
        this.dao = dao;
    }
    registerUser = (userData) => {
        return this.dao.registerUser(userData);
    }
    loginUser = (userData, request) => {
        return this.dao.loginUser(userData, request);
    }
    changeRoleUser = (user) =>{
        return this.dao.changeRoleUser(user)
    }
    changePassword = (token, password) =>{
        return this.dao.changePassword(token, password)
    }
    uploadFiles = (req) =>{
        return this.dao.uploadFiles(req)
    }
    findAllUsers = () => {
        return this.dao.findAllUsers()
    }
    deleteInactiveUseres = (users) => {
        return this.dao.deleteInactiveUseres(users)
    }
};