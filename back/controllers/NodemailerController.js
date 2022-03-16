/*
 * Controller: Nodemailer
 * **************** */
const bcrypt = require("bcrypt");
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
            pass: process.env.MDP_MAIL
        }
    });

module.exports = {
    lostpassword: async (req, res) => {
        console.log("Je suis le controller MDP oublié", req.body)
        const user = await db.query(`SELECT * FROM user WHERE email="${req.body.email}";`)
        if (user) {
            // génération d'un chiffre random
            rand = Math.floor((Math.random() * 100) + 54)
            // on definit notre host
            host = req.get('host')
            // on définit le lien
            link = "http://" + req.get('host') + "/lostpassword/" + rand
            // et enfin notre mail
            mailOptions = {
                from: 'testgrainesdecitoyen@gmail.com',
                to: req.body.email,
                subject: "Mot de passe oublié",
                rand: rand,
                html: `
          <h2>Encore un effort</h2><br>
          <h4>Cliquer sur le lien suivant afin de finir la procédure de recréation de mot de passe.</h4><br>
          <a href=" ` + link + ` ">Click here to create password</a>
        `
            }
            // Et envoi notre mail avec nos callback
            transporter.sendMail(mailOptions, (err, res, next) => {
                if (err) {
                    console.log(err)
                    res.end("error")
                } else {
                    console.log("Message Envoyé")
                    next()
                }
            })

            console.log('Données ', rand, link, mailOptions, host)
            // Response
            res.render('home', {
                dbarticles: await db.query(`SELECT * FROM articles ORDER BY dateart DESC LIMIT 3`),
                success: "Un email à bien été envoyer à " + req.body.email
            })

        } else
            res.render('home', {
                dbarticles: await db.query(`SELECT * FROM articles ORDER BY dateart DESC LIMIT 3`)
            })
    },

    PageEditPassword: (req, res) => {

        console.log(req.protocol + "://" + req.get('host'))
        console.log('Page Edit Password: ', rand, mailOptions, host)

        // Ici on tcheck notre protocole hébergeur (nodejs localhost) et le liens générer dans le mail
        if ((req.protocol + "://" + req.get('host')) == ("http://" + host)) {
            console.log("Domain is matched. Information is from Authentic email")

            // Ici on tcheck notre id du mail avec la variable enregistrer en cache (rand)
            if (req.params.id == mailOptions.rand) {
                console.log("email is verified")
                // res.end("<h1>Email " + mailOptions.to + " is been Successfully verified")
                res.render('editPassword', {
                    mailOptions,
                    rand
                })

            } else {
                console.log("email is not verified")
                res.render('editPassword', {
                    message: "Bad Request !"
                })
            }
        } else {
            res.render('editPassword', {
                message: "Request is from unknown source !"
            })
        }
    },

    editPassword: async (req, res) => {
        console.log("Je suis le controller Changement de mdp", req.body, rand, host, mailOptions);
        const {
            password
        } = req.body;

        const hash = bcrypt.hashSync(password, 10);

        await db.query(`UPDATE user SET password = "${hash}" WHERE email= "${req.body.email}"`);

        res.redirect("/")
    },


    SendMessage: async (req, res) => {
        console.log("Je suis le controller Send Message dans messages", req.body);
        
        message = await db.query(`SELECT * FROM messages WHERE id = ${req.params.id}`)

        const mailOptions = {
            from: `testgrainesdecitoyen@gmail.com`,
            to: message[0].email,
            subject: 'Bonjour ' + message[0].author + ' !',
            html: `
        <h2>${req.body.message}</h2>
      `
        }
        // On demande à notre transporter d'envoyer notre mail
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) console.log(err)
            else {
                console.log(info)
                res.redirect('/messages')
                console.log("success : Un message à bien été envoyer à ", message[0].email)

            }
        })
    }
};