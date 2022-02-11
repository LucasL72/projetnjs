/*
 * Controller: Contact
 * **************** */
let rand, host, link, mailOptions;
// import nodemailer 
const nodemailer = require('nodemailer'),
  // Déclaration ne notre transporter
  // C'est en quelque sorte notre connexion à notre boite mail
  transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    service: 'gmail',
    port: '587',
    auth: {
      user: "testgrainesdecitoyen@gmail.com",
      pass: "rfn2K22$"
    }
  });

exports.contactpage = (req, res) => {
  console.log('je suis la page contact')
  res.render("contact");
};

exports.CreateMessage = (req, res) => {
  console.log("Je suis le controller Create Message dans contact", req.body);
  console.log(req.body)
  // On configure notre mail à envoyer par nodemailer
  const mailOptions = {
    from: req.body.email,
    to: `testgrainesdecitoyen@gmail.com`,
    subject: 'Message de : ' + req.body.author+' !',
    html: `
      <h2>${req.body.message}, mail : ${req.body.email}</h2>
    `
  }
  // On demande à notre transporter d'envoyer notre mail
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) console.log(err)
    else {
      console.log(info)
      res.redirect('/')
      console.log("success : Un message à bien été envoyer de ", req.body.email)

    }
  })
};