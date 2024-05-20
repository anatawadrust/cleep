import React, { useState } from 'react';
import { addProveedor } from './api';

const AgregarProveedor = ({ proveedores, setProveedores }) => {
  const [nombre, setNombre] = useState('');
  const [contacto, setContacto] = useState('');
  const [telefono, setTelefono] = useState('');
  const [direccion, setDireccion] = useState('');
  const [error, setError] = useState('');

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
      <h2>Agregar Proveedor</h2>
      {error && <p className="error">{error}</p>}
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
  );
};

export default AgregarProveedor;
