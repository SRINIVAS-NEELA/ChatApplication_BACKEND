const ObjectID = require("mongodb").ObjectID
const db = require('../config/db')



const registerUser = async user => {
    try {
        return (await db.getCollection('user').insertOne(user)).ops[0]
    } catch (e) {
        throw e
    }
}

const findUserByUserName = async userName => {
    try {
        return await db.getCollection('user').findOne({userName})
    } catch (e) {
        throw e
    }
}

module.exports = { registerUser, findUserByUserName }
