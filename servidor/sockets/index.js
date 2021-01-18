const Chat = require('../models/Chat');

module.exports = io => {

    let users = [];
    let nombre;
    io.on('connection', async socket => {
        setInterval(() => {
            Chat.find({}).limit(8).sort('-created')
                .then(data => {
                    socket.emit('load old msgs', data);
                    socket.emit('usernames', users);

                })
        }, 1000)

        socket.on('adios', (data) => {
            var i = users.indexOf(nombre);

            if (i !== -1) {
                users.splice(i, 1);
            }

        });

        socket.on('new user', (data) => {
            if (users.indexOf(data) !== -1) {
                socket.nickname = data;
                nombre = data
            }
            else {
                socket.nickname = data;
                nombre = data
                users.push(data)
            }

        });

        socket.on('send message', async (data, cb) => {
            var msg = data.trim();

            if (msg.substr(0, 3) === '/w ') {
                msg = msg.substr(3);
                var index = msg.indexOf(' ');
                if (index !== -1) {
                    var name = msg.substring(0, index);
                    var msg = msg.substring(index + 1);
                    if (name in users) {
                        users[name].emit('whisper', {
                            msg,
                            nick: socket.nickname
                        });
                    } else {
                        cb('Error! Enter a valid User');
                    }
                } else {
                    cb('Error! Please enter your message');
                }
            } else {
                var newMsg = new Chat({
                    msg,
                    nick: nombre
                });
                await newMsg.save();

                io.sockets.emit('new message', {
                    msg,
                    nick: socket.nickname
                });
            }
        });



    });

}
