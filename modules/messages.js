const ObjectID = require("mongodb").ObjectID
const db = require('../config/db')


const addMessage = async message => {
    try {
        return (await db.getCollection('message').insertOne(message)).ops[0]
    } catch (e) {
        throw e
    }
}

const showUserMessages = async channelId => {
    try {
        return await db.getCollection('message').find({ channelId: ObjectID(channelId)}).toArray()
    } catch (e) {
        throw e
    }
}
module.exports={addMessage, showUserMessages}