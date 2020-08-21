const http = require('http');
const hl7 = require('simple-hl7')
const app = hl7.tcp()
const env = require('dotenv').config()
const server = require('http').Server(app)

server.listen(process.env.HTTP_PORT, async function(){
    // await console.log(data);

    server.on('data', (data) => {
        const ansData = data.toString();
        console.log(`${new Date()} HL7 answer data: ${ansData}`);
        server.end();
    });

    server.on('error', (err) => {
        const reqerror = `${new Date()} problem with request: ${err.message}`;
        console.error(reqerror);
        server.end();
        console.log(`${new Date()} disconnected from HL7 server`);
    });

    server.on('end', () => {
        console.log(`${new Date()} disconnected from HL7 server`);
    });

});
// http.createServer(function (req, res) {
//     // res.writeHead(200, {'Content-Type': 'Application/json'})
//     // res.writeHead(200, {'Content-Type': 'application/hl7-v2', 'charset=ISO-8859-1'})
//     // res.write({
//     //     "success": true,
//     //     "message": "Tunaskilizia mtu atume chochote!"
//     //     })
//     // console.log(hl7.req.msg.log())
//     console.log(req)
//     res.end()
// }).listen(process.env.HTTP_PORT || 4500)

// app.use( function listen (req, res, next) {
//     console.log(hl7.res.ack)
// })

// app.use(function receiveMessage (req, res, next) {
//     //req.msg is the HL7 message
//     setTimeout(() => {
//         console.log('******message received*****')
//     }, 500   );

//     setTimeout(() => {
//         console.log(req.msg.log());
//     }, 1000);

//     next();
// })

// app.use(function sendAck (req, res, next){
//     //res.ack is the ACK
//     //acks are created automatically
    
//     //send the res.ack back
//     setTimeout(() => {
//         const msa = res.ack.getSegment('MSA')
//             msa.addField('Imeisha hiyo!', 3)
//         console.log('******sending ack back*****')
//         // res.end()
//     }, 1500);

//     setTimeout(() => {
//         // console.log(res.ack)
//         res.end();
//     }, 2000);
// })
// app.start(process.env.HTTP_PORT || 4500);