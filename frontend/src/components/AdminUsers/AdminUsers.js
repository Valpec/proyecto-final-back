import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { getUsers, updateUserRole, deleteInactiveUsers } from '../../services/user.service';
import { useNavigate } from 'react-router-dom';
import './AdminUsers.css';

const AdminUsers = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (user.role !== 'admin') {
      navigate('/login');
    } else {
      fetchUsers();
    }
  }, [user, navigate]);

  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleChangeRole = async (userId, newRole) => {
    try {
      await updateUserRole(userId, newRole);
      fetchUsers(); 
    } catch (error) {
      console.error('Error updating user role:', error);
    }
  };

  const handleDeleteInactive = async () => {
    try {
      await deleteInactiveUsers();
      fetchUsers(); 
    } catch (error) {
      console.error('Error deleting inactive users:', error);
    }
  };

  if (user.role !== 'admin') {
    return <p>No tienes permiso para acceder a esta página</p>;
  }

  return (
    <div className='adminUsersContainer'>
      <h2>Administrar Usuarios</h2>
      <button onClick={handleDeleteInactive}>Eliminar Usuarios Inactivos</button>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Cambiar Rol</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.firstName} {user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button onClick={() => handleChangeRole(user._id, user.role === 'user' ? 'premium' : 'user')}>
                  {user.role === 'user' ? 'Hacer Premium' : 'Hacer Usuario'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsers;
