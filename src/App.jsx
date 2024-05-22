import React, { useState, useEffect } from 'react';
import './App.css';
import { getProveedores, addProveedor, updateProveedor, deleteProveedor } from './api';
import AgregarProveedor from './AgregarProveedor';

function App() {
  const [proveedores, setProveedores] = useState([]);
  const [editingProveedor, setEditingProveedor] = useState(null);

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

  const handleAddProveedor = async (nuevoProveedor) => {
    try {
      const addedProveedor = await addProveedor(nuevoProveedor);
      setProveedores([...proveedores, { ...nuevoProveedor, codigo: addedProveedor.id }]);
    } catch (error) {
      console.error('Error adding proveedor:', error);
    }
  };

  const handleUpdateProveedor = async (codigo, updatedProveedor) => {
    try {
      await updateProveedor(codigo, updatedProveedor);
      setProveedores(proveedores.map(proveedor => (proveedor.codigo === codigo ? { ...proveedor, ...updatedProveedor } : proveedor)));
      setEditingProveedor(null);
    } catch (error) {
      console.error('Error updating proveedor:', error);
    }
  };

  const handleDeleteProveedor = async (codigo) => {
    try {
      await deleteProveedor(codigo);
      setProveedores(proveedores.filter(proveedor => proveedor.codigo !== codigo));
    } catch (error) {
      console.error('Error deleting proveedor:', error);
    }
  };

  const handleEditClick = (proveedor) => {
    setEditingProveedor(proveedor);
  };

  return (
    <div className="dashboard">
      <div className="sidebar">
        <h2>Menú</h2>
        <nav>
          <ul>
            <li><a href="#!" onClick={() => setCurrentSection('proveedores')}>Proveedores</a></li>
          </ul>
        </nav>
      </div>
      <div className="main-content">
        <div className="header">
          <h1>Cleep.com!</h1>
        </div>
        <div className="card">
          <h2>Lista de Proveedores</h2>
          <ul>
            <li className="header">
              <span>Nombre</span>
              <span>Contacto</span>
              <span>Teléfono</span>
              <span>Dirección</span>
              <span>Acciones</span>
            </li>
            {proveedores.map(proveedor => (
              <li key={proveedor.codigo}>
                <span>{proveedor.nombre}</span>
                <span>{proveedor.contacto}</span>
                <span>{proveedor.telefono}</span>
                <span>{proveedor.direccion}</span>
                <span>
                  <button onClick={() => handleEditClick(proveedor)}>Editar</button>
                  <button onClick={() => handleDeleteProveedor(proveedor.codigo)}>Eliminar</button>
                </span>
              </li>
            ))}
          </ul>
        </div>
        <AgregarProveedor 
          proveedores={proveedores} 
          setProveedores={setProveedores} 
          onAdd={handleAddProveedor} 
          onUpdate={handleUpdateProveedor}
          editingProveedor={editingProveedor}
          setEditingProveedor={setEditingProveedor}
        />
      </div>
    </div>
  );
}

export default App;
