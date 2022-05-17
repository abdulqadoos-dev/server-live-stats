const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
    service: process.env.MAILER_HOST || 'gmail',
    auth: {
        user: process.env.MAILER_USER,
        pass: process.env.MAILER_PASSWORD
    }
});

const send = (to, subject, body, from=null) => {
    const mailOptions = {
        from: from || process.env.MAILER_USER,
        to: to,
        secure: false,
        subject: subject,
        html: body
    };
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

module.exports = { send }
