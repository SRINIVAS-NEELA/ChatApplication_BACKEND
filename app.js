const express = require('express');
const app = express();
const db = require('./config/db');
const port = process.env.PORT || 3000
require('dotenv').config();
const http = require('http').createServer(app);
const io = require('socket.io')(http);


const UserModel = require('./models/UserModel');
const ChannelModel = require('./models/ChannelModel')
const MessageModel = require('./models/MessageModel')
const channelModule = require('./modules/channel')
const UserModule = require('./modules/user')
const MessageModule = require('./modules/messages')

// Socket Code
io.on('connection', function (socket) {
    // ON DISCONNECT
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });

    socket.on('add_user', async (data) => {
        socket.userName = data.userName
        // Check if user Exists then next step or result the existing user
        // Insert the user to DataBase 
        // Get all Channels List

        const userObj = await UserModule.findUserByUserName(data.userName)
        if (userObj) {
            const { userName, _id: userId } = userObj
            const channels = await channelModule.showChannels();


            socket.emit('channels', {
                channels,
                userName,
                userId
            })
        } else {
            const user = new UserModel(data.userName);
            const { userName, _id: userId } = await UserModule.registerUser(user);
            const channels = await channelModule.showChannels();


            socket.emit('channels', {
                channels,
                userName,
                userId
            })
        }
    })

    socket.on('new_channel', async data => {
        const { userId, channelName } = data
        // Create a new channel
        await channelModule.addChannel(new ChannelModel(channelName, userId))
        const channels = await channelModule.showChannels();
        io.sockets.emit('channels', { channels })
    })

    socket.on('message', async (data) => {
        const { channelId } = data
        // get Messages for particular channelId
        const messages = await MessageModule.showUserMessages(channelId)
        socket.emit('message', { messages })
    })

    socket.on('new_message', async (data) => {
        const { message, channelId, userId: createdBy } = data;
        // Insert Message
        await MessageModule.addMessage(new MessageModel(message, channelId, createdBy))
        const messages = await MessageModule.showUserMessages(channelId)
        socket.emit('message', { messages })
        io.sockets.emit('message', { messages })
    })

});



app.get('/', (req, res) => {
    console.log("Main Route");
})

db.connect(process.env.URL, function (err) {
    if (err) {
        console.log("Unable to connect to MongoDB ....", err)
        process.exit(1)
    } else {
        // app.listen(port, () => console.log(`Server Running at Port.... ${port}`))
        http.listen(port, () => console.log(`Server Running at Port.... ${port}`))
    }
})
