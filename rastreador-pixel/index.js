const express = require('express');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3000;

// Middleware para obtener la IP real detrás de proxies
app.set('trust proxy', true);

app.get('/pixel', (req, res) => {
  const ip = req.ip;
  const userAgent = req.headers['user-agent'];
  const usuario = req.query.usuario || 'desconocido';

  // Simular ubicación (en versión real usarías alguna API para IP lookup)
  const date = new Date().toISOString();
  const log = `Pixel abierto por ${ip} - Usuario: ${usuario} - Navegador: ${userAgent} - Fecha: ${date}\n`;

  console.log(log); // Muestra en consola
