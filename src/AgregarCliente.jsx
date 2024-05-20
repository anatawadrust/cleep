import React, { useState } from 'react';
import { addCliente } from './api';

const AgregarCliente = ({ clientes, setClientes }) => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [correo, setCorreo] = useState('');
  const [fecha_nac, setFecha_nac] = useState('');
  const [telefono, setTelefono] = useState('');
  const [pais, setPais] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');

  const handleAddCliente = async (e) => {
    e.preventDefault();
    setError('');

    if (!nombre || !apellido || !correo || !fecha_nac || !telefono || !pais || !ciudad || !contrasena) {
      setError('Todos los campos son obligatorios');
      return;
    }

    try {
      const nuevoCliente = { nombre, apellido, correo, fecha_nac, telefono, pais, ciudad, contrasena };
      const data = await addCliente(nuevoCliente);
      setClientes([...clientes, { codigo: data.id, nombre, apellido, correo, fecha_nac, telefono, pais, ciudad, contrasena }]);
      setNombre('');
      setApellido('');
      setCorreo('');
      setFecha_nac('');
      setTelefono('');
      setPais('');
      setCiudad('');
      setContrasena('');
    } catch (error) {
      console.error('Error adding cliente:', error);
      setError('Error agregando el cliente');
    }
  };

  return (
    <div className="card">
      <h2>Agregar Cliente</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleAddCliente}>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Apellido"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Correo"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          required
        />
        <input
          type="date"
          placeholder="Fecha de Nacimiento"
          value={fecha_nac}
          onChange={(e) => setFecha_nac(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Teléfono"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="País"
          value={pais}
          onChange={(e) => setPais(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Ciudad"
          value={ciudad}
          onChange={(e) => setCiudad(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
          required
        />
        <button type="submit">Agregar Cliente</button>
      </form>
    </div>
  );
};

export default AgregarCliente;
