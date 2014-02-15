var dgram = require('dgram');
var message = new Buffer("Some bytes");
var client = dgram.createSocket("udp4");

var identity = {serverAddress: "127.0.0.1", serverCapabilities: ["accountServices"]};
message = new Buffer( JSON.stringify(identity) );
client.send(message, 0, message.length, 41234, "localhost", function(err, bytes) {
    client.close();
});
