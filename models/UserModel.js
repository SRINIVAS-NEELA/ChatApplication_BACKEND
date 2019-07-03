module.exports = class UserModel {
    constructor(userName, createdAt = new Date()) {
        this.userName = userName
        this.createdAt = createdAt
    }
}