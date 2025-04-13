// Importar dependencias
const express = require('express');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3000;

// Ruta para registrar la apertura del pixel
app.get('/pixel', (req, res) => {
  const ip = req.ip;  // Obtener IP del visitante
  const userAgent = req.headers['user-agent'];  // Obtener información del navegador
  const usuario = req.query.usuario || 'desconocido';  // Nombre del usuario desde query

  // Registrar información de la apertura del pixel en el log
  const date = new Date().toISOString();  // Obtener la fecha y hora actual
  const log = `Pixel abierto por ${ip} - Usuario: ${usuario} - Navegador: ${userAgent} - Fecha: ${date}\n`;

  console.log(log);  // Imprimir en la consola (opcional para debugging)
  fs.appendFileSync('log.txt', log);  // Escribir en el archivo log.txt

  // Enviar un píxel transparente
  const pixel = Buffer.from(
    'R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==', 
    'base64'
  );

  res.set('Content-Type', 'image/gif');
  res.send(pixel);  // Enviar el píxel como respuesta
});

// Ruta para ver los logs almacenados en log.txt
app.get('/verlogs', (req, res) => {
  fs.readFile('log.txt', 'utf8', (err, data) => {
    if (err) {
      console.error("Error al leer el archivo de logs:", err);
      return res.status(500).send('Error al leer los logs.');
    }
    res.setHeader('Content-Type', 'text/plain');
    res.send(data);  // Mostrar el contenido del archivo log.txt
  });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});