// server.js (o como prefieras nombrarlo)

const express = require('express');
const bodyParser = require('body-parser');
const { prisma } = require('./prisma');

const app = express();
const port = process.env.PORT || 3000;

// Middleware para analizar el cuerpo de la solicitud en formato JSON
app.use(bodyParser.json());

// Ruta para manejar la solicitud de envío de correo electrónico
app.post('/api/sendEmail', async (req, res) => {
  const { email, lang } = req.body;

  try {
    const createEmail = await prisma.email.create({
      data: {
        email,
        lang,
      },
    });

    res.status(201).json({ message: "Email registered successfully" });
  } catch (err) {
    console.error('Error sending email:', err);
    res.status(500).json({ message: 'Internal server error while sending the email', error: err.message });
  }
});

// Manejar solicitudes GET en la misma ruta con un código de estado 405
app.get('/api/sendEmail', (req, res) => {
  res.status(405).json({ "Error": "invalid method" });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
