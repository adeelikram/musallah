// require nodemailer
var nodemailer = require('nodemailer');
// export the  function
module.exports = function (receiver,subject, message) {
    // auth for nodemialer
    var smtpTransport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'damptemp@gmail.com',
            pass: 'damptemp123'
        }
    });
    // send email
    smtpTransport.sendMail({
        from: "damptemp@gmail.com",
        to: receiver,
        subject: subject,
        html:message 
    });

}
