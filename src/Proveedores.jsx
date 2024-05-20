import React, { useEffect, useState } from 'react';
import './App.css';
import { getProveedores, addProveedor } from './api';

function Proveedores() {
  const [proveedores, setProveedores] = useState([]);
  const [nombre, setNombre] = useState('');
  const [contacto, setContacto] = useState('');
  const [telefono, setTelefono] = useState('');
  const [direccion, setDireccion] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProveedores = async () => {
      try {
        const data = await getProveedores();
        setProveedores(data);
      } catch (error) {
        console.error('Error fetching proveedores:', error);
      }
    };

    fetchProveedores();
  }, []);

  const handleAddProveedor = async (e) => {
    e.preventDefault();
    setError('');

    if (!nombre || !contacto || !telefono || !direccion) {
      setError('Todos los campos son obligatorios');
      return;
    }

    try {
      const nuevoProveedor = { nombre, contacto, telefono, direccion };
      const data = await addProveedor(nuevoProveedor);
      setProveedores([...proveedores, { codigo: data.id, nombre, contacto, telefono, direccion }]);
      setNombre('');
      setContacto('');
      setTelefono('');
      setDireccion('');
    } catch (error) {
      console.error('Error adding proveedor:', error);
      setError('Error agregando el proveedor');
    }
  };

  return (
    <div className="card">
      <h2>Lista de Proveedores</h2>
      {error && <p className="error">{error}</p>}
      <ul>
        <li className="header">
          <span>Nombre</span>
          <span>Contacto</span>
          <span>Teléfono</span>
          <span>Dirección</span>
        </li>
        {proveedores.map(proveedor => (
          <li key={proveedor.codigo}>
            <span>{proveedor.nombre}</span>
            <span>{proveedor.contacto}</span>
            <span>{proveedor.telefono}</span>
            <span>{proveedor.direccion}</span>
          </li>
        ))}
      </ul>
      <div>
        <h2>Agregar Proveedor</h2>
        <form onSubmit={handleAddProveedor}>
          <input
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Contacto"
            value={contacto}
            onChange={(e) => setContacto(e.target.value)}
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
            placeholder="Dirección"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
            required
          />
          <button type="submit">Agregar Proveedor</button>
        </form>
      </div>
    </div>
  );
}

export default Proveedores;
