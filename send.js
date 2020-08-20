const env = require('dotenv').config()
const client = hl7.Server.createTcpClient('localhost', process.env.SND_PORT || 3200);

//create a message
const msg = new hl7.Message(
                    "EPIC",
                    "EPICADT",
                    "SMS",
                    "199912271408",
                    "CHARRIS",
                    ["ADT", "A04"], //This field has 2 components
                    "1817457",
                    "D",
                    "2.5"
                );

console.log('******sending message*****')
client.send(msg, function(err, ack) {
  console.log('******ack received*****')
  console.log(ack.log());
});