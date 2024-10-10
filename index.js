const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
require('dotenv').config(); // Cargar variables 

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('public'));

app.post('/send-email', (req, res) => {
    const { name, email, phone, subject, message } = req.body;


    console.log('GMAIL_USER:', process.env.GMAIL_USER);
    console.log('GMAIL_PASS:', process.env.GMAIL_PASS);

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASS
        }
    });

    let mailOptions = {
        from: email,
        to: process.env.GMAIL_USER,
        subject: `Contacto de ${name}: ${subject}`,
        text: `Has recibido un nuevo mensaje de ${name} (${email}, ${phone}):\n\n${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());
        }
        res.send('Correo enviado correctamente');
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
