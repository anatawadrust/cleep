import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
});

export const getProveedores = async () => {
  try {
    const response = await api.get('/proveedor');
    return response.data;
  } catch (error) {
    console.error('Error fetching proveedores:', error);
    throw error;
  }
};

export const addProveedor = async (nuevoProveedor) => {
  try {
    const response = await api.post('/proveedor', nuevoProveedor);
    return response.data;
  } catch (error) {
    console.error('Error adding proveedor:', error);
    throw error;
  }
};

export const updateProveedor = async (codigo, updatedProveedor) => {
  try {
    const response = await api.put(`/proveedor/${codigo}`, updatedProveedor);
    return response.data;
  } catch (error) {
    console.error('Error updating proveedor:', error);
    throw error;
  }
};

export const deleteProveedor = async (codigo) => {
  try {
    const response = await api.delete(`/proveedor/${codigo}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting proveedor:', error);
    throw error;
  }
};
