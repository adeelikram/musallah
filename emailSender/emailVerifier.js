// export nodemailer function
module.exports = function (receiver,id) {
    // require nodemailer
    var nodemailer = require('nodemailer');
    // create nodemailer transpaport
    var transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'damptemp@gmail.com',
            pass: 'damptemp123'
        }
    });
    // create mail options
    var mailOptions = {
        from: "damptemp@gmail.com",
        to: receiver,
        subject: "Musallah",
        html: "<p>Hi!</p><p>Please click the <a target='_blank' href='http://localhost:3000/verify/"+id+"'>link</a> to verify this email address</p>"
    };
    // send mail
    transport.sendMail(mailOptions, function (error, info) {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
    });
}

