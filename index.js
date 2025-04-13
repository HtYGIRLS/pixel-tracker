const express = require('express');
const axios = require('axios');
const app = express();
const fs = require('fs');
const port = process.env.PORT || 3000;

app.get('/pixel', async (req, res) => {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const usuario = req.query.usuario || 'desconocido';
  const fecha = new Date().toISOString();

  try {
    const geo = await axios.get(`http://ip-api.com/json/${ip}`);

    const data = {
      usuario,
      ip,
      fecha,
      geo: geo.data
    };

    fs.appendFileSync('log.txt', JSON.stringify(data) + '\n');
  } catch (err) {
    console.error('Error al obtener ubicación:', err.message);
  }

  const img = Buffer.from(
    'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADElEQVR4nGNgYGD4DwABBAEAf0INPwAAAABJRU5ErkJggg==',
    'base64'
  );
  res.writeHead(200, {
    'Content-Type': 'image/png',
    'Content-Length': img.length
  });
  res.end(img);
});

app.get('/', (req, res) => {
  res.send('Servidor de rastreo activo 🚀');
});

app.listen(port, () => {
  console.log(`Servidor activo en http://localhost:${port}`);
});
