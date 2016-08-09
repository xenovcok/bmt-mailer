const nodemailer = require('nodemailer');
const smtpPool = require('nodemailer-smtp-pool');

const transporter = nodemailer.createTransport(smtpPool({
    host:'mailtrap.io',
    port:2525,
    //service:'Gmail',
    secure: false,
    maxConnections: 1,
    rateLimit: 3,
    auth:{
        user:'1810606566c575',
        pass:'20074f341c3d2a'
        //user:'danar.jati@gmail.com',
        //pass:'31121991H3rw1nx22'
    }
}));

module.exports = transporter;
