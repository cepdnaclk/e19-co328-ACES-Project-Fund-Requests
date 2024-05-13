// emailService.js
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'cedepartmenttest@gmail.com',
    pass: 'qvlqmgtkqfsyxtiu'
  }
});

function sendEmail(receiverEmail, subject, text) {
  var mailOptions = {
    from: 'cedepartmenttest@gmail.com',
    to: receiverEmail,
    subject: subject,
    text: text
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

module.exports = {
  sendEmail
};


