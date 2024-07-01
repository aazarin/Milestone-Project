// server.js

const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

//Middleware
app.use(bodyParser.urlencoded({extended: false }));
app.use(bodyParser.json());

//To get my images to load
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req, res) => {
    res.sendFile("public/index.html", {root: __dirname });
});

//Routes
app.post('/send-email', (req, res) => {
    const { name, email, message } = req.body;

    console.log('Form Data:', name, email, message);

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'aryanazarin1@gmail.com',
            pass: 'qdbg durk vhkq zrsr'
        }
    });
    //email data
    let mailOptions = {
        from: email,
        to: 'aryanazarin1@gmail.com',
        subject: 'New Message from Contact Form',
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    };
    //sending and receiving errors
    transporter.sendMail(mailOptions, (error, info) => {
        if(error){
            console.log(error);
            res.status(500).send('Error sending email');
        } else {
            console.log('Email sent: ' + info.response);
            res.send('Email sent successfully');
        }
    });

});

//server
app.listen(PORT, () => {
    console.log('Server is running on http://localhost:3000');
})



