const hl7 = require('simple-hl7')
const app = hl7.tcp()
const env = require('dotenv').config()

app.use(function receiveMessage (req, res, next) {
    //req.msg is the HL7 message
    setTimeout(() => {
        console.log('******message received*****')
    }, 500   );

    setTimeout(() => {
        console.log(req.msg.log());
    }, 1000);

    next();
})

app.use(function sendAck (req, res, next){
    //res.ack is the ACK
    //acks are created automatically
    
    //send the res.ack back
    setTimeout(() => {
        const msa = res.ack.getSegment('MSA')
            msa.addField('Imeisha hiyo!', 3)
        console.log('******sending ack back*****')
        // res.end()
    }, 1500);

    setTimeout(() => {
        // console.log(res.ack)
        res.end();
    }, 2000);
})

app.use(function handleError (err, req, res, next) {
    //error handler
    //standard error middleware would be
    console.log('******ERROR*****')
    console.log(err);
    const msa = res.ack.getSegment('MSA');
        msa.setField(1, 'AR');
    res.ack.addSegment('ERR', err.message);
    res.end();
});

//Listen on configured port in ENV file or if not default to 7777
app.start(process.env.MLLP_PORT || 4400);