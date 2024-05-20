import React, { useState, useEffect } from 'react';
import './App.css';
import { getProveedores, getClientes } from './api';
import AgregarProveedor from './AgregarProveedor';
import AgregarCliente from './AgregarCliente';

function App() {
  const [currentSection, setCurrentSection] = useState('proveedores');
  const [proveedores, setProveedores] = useState([]);
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    const fetchProveedores = async () => {
      try {
        const data = await getProveedores();
        setProveedores(data);
      } catch (error) {
        console.error('Error fetching proveedores:', error);
      }
    };

    const fetchClientes = async () => {
      try {
        const data = await getClientes();
        setClientes(data);
      } catch (error) {
        console.error('Error fetching clientes:', error);
      }
    };

    fetchProveedores();
    fetchClientes();
  }, []);

  return (
    <div className="dashboard">
      <div className="sidebar">
        <h2>Menú</h2>
        <nav>
          <ul>
            <li><a href="#!" onClick={() => setCurrentSection('proveedores')}>Proveedores</a></li>
            <li><a href="#!" onClick={() => setCurrentSection('clientes')}>Clientes</a></li>
          </ul>
        </nav>
      </div>
      <div className="main-content">
        <div className="header">
          <h1>Cleep.com!</h1>
        </div>
        {currentSection === 'proveedores' && (
          <>
            <div className="card">
              <h2>Lista de Proveedores</h2>
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
            </div>
            <AgregarProveedor proveedores={proveedores} setProveedores={setProveedores} />
          </>
        )}
        {currentSection === 'clientes' && (
          <>
            <div className="card">
              <h2>Lista de Clientes</h2>
              <ul>
                <li className="header">
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
            </div>
            <AgregarCliente clientes={clientes} setClientes={setClientes} />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
