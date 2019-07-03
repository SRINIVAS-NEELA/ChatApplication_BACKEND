const ObjectID = require("mongodb").ObjectID

module.exports = class MessageModel {
    constructor(message, channelId, createdBy, timeStamp = new Date()) {
        this.message = message
        this.channelId = ObjectID(channelId)
        this.createdBy = ObjectID(createdBy) 
        this.timeStamp = timeStamp
    }
}