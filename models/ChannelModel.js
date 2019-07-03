const ObjectID = require("mongodb").ObjectID

module.exports = class ChannelModel {
    constructor(channelName, createdBy) {
        this.channelName = channelName
        this.createdBy = ObjectID(createdBy)
    }
}