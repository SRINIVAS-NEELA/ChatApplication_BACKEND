const ObjectID = require("mongodb").ObjectID
const db = require('../config/db')


const addChannel = async channel => {
    try {
        return (await db.getCollection('channel').insertOne(channel)).ops[0]
    } catch (e) {
        throw e
    }
}

const showChannels = async() => {
    try {
        return  await db.getCollection('channel').find().toArray();
    }
    catch (e) {
        throw e
    }
}
module.exports ={addChannel,showChannels}