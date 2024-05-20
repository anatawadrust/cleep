import React, { useEffect, useState } from 'react';
import './App.css';
import { getClientes, addCliente } from './api';

function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [codigo, setCodigo] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [correo, setCorreo] = useState('');
  const [fechaNac, setFechaNac] = useState('');
  const [telefono, setTelefono] = useState('');
  const [pais, setPais] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const data = await getClientes();
        setClientes(data);
      } catch (error) {
        console.error('Error fetching clientes:', error);
      }
    };

    fetchClientes();
  }, []);

  const handleAddCliente = async (e) => {
    e.preventDefault();
    setError('');

    if (!nombre || !apellido || !correo || !fechaNac || !telefono || !pais || !ciudad || !contrasena) {
      setError('Todos los campos son obligatorios');
      return;
    }

    try {
      const nuevoCliente = { nombre, apellido, correo, fecha_nac: fechaNac, telefono, pais, ciudad, contrasena };
      const data = await addCliente(nuevoCliente);
      setClientes([...clientes, { codigo: data.id, ...nuevoCliente }]);
      setNombre('');
      setApellido('');
      setCorreo('');
      setFechaNac('');
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
      <h2>Lista de Clientes</h2>
      {error && <p className="error">{error}</p>}
      <ul>
        <li className="header">
          <span>Código</span>
          <span>Nombre</span>
          <span>Apellido</span>
          <span>Correo</span>
          <span>Fecha de Nacimiento</span>
          <span>Teléfono</span>
          <span>País</span>
          <span>Ciudad</span>
          <span>Contraseña</span>
        </li>
        {clientes.map(cliente => (
          <li key={cliente.codigo}>
            <span>{cliente.codigo}</span>
            <span>{cliente.nombre}</span>
            <span>{cliente.apellido}</span>
            <span>{cliente.correo}</span>
            <span>{cliente.fecha_nac}</span>
            <span>{cliente.telefono}</span>
            <span>{cliente.pais}</span>
            <span>{cliente.ciudad}</span>
            <span>{cliente.contrasena}</span>
          </li>
        ))}
      </ul>
      <div>
        <h2>Agregar Cliente</h2>
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
            value={fechaNac}
            onChange={(e) => setFechaNac(e.target.value)}
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
    </div>
  );
}

export default Clientes;
