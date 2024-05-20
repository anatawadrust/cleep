const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3002;

app.use(cors());
app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // Tu contraseña de MySQL
  database: 'cleep' // Asegúrate de que el nombre de la base de datos es correcto
});

connection.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
});

// Endpoint para obtener datos de la tabla proveedor
app.get('/api/proveedor', (req, res) => {
  connection.query('SELECT * FROM proveedor', (err, results) => {
    if (err) {
      console.error('Error fetching proveedores:', err);
      return res.status(500).send(err);
    }
    res.json(results);
  });
});

// Endpoint para agregar un nuevo proveedor
app.post('/api/proveedor', (req, res) => {
  const { nombre, contacto, telefono, direccion } = req.body;
  const query = 'INSERT INTO proveedor (nombre, contacto, telefono, direccion) VALUES (?, ?, ?, ?)';
  connection.query(query, [nombre, contacto, telefono, direccion], (err, results) => {
    if (err) {
      console.error('Error adding proveedor:', err);
      return res.status(500).send(err);
    }
    res.status(201).json({ message: 'Proveedor added successfully', id: results.insertId });
  });
});

// Endpoint para obtener datos de la tabla clientes
app.get('/api/cliente', (req, res) => {
  connection.query('SELECT * FROM clientes', (err, results) => {
    if (err) {
      console.error('Error fetching clientes:', err);
      return res.status(500).send(err);
    }
    res.json(results);
  });
});

// Endpoint para agregar un nuevo cliente
app.post('/api/cliente', (req, res) => {
  const { nombre, apellido, correo, fecha_nac, telefono, pais, ciudad, contrasena } = req.body;
  const query = 'INSERT INTO clientes (nombre, apellido, correo, fecha_nac, telefono, pais, ciudad, contrasena) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  connection.query(query, [nombre, apellido, correo, fecha_nac, telefono, pais, ciudad, contrasena], (err, results) => {
    if (err) {
      console.error('Error adding cliente:', err);
      return res.status(500).send(err);
    }
    res.status(201).json({ message: 'Cliente added successfully', id: results.insertId });
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
