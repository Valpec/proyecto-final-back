import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import './Profile.css';
import { Link, useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate('/login'); 
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  if (!user) {
    return <p>Sesion no encontrada</p>;
  }

  return (
    <div className='profileContainer'>
      <h2>Perfil:</h2>
      <h3>{user.firstName} {user.lastName}</h3>
      <h4>{user.email}</h4>
      <p>{user.age}</p>

      <h5>Su rol actual: {user.role}</h5>
      <p>Desea cambiarlo?</p>
      <Link to="/*"><button>Cambiar rol</button></Link>
      <Link to="/*"><button>Subir archivos</button></Link>

      {user.role === 'admin' && (
        <Link to="/admin-users">
          <button>Administrar Usuarios</button>
        </Link>
      )}

      <button type="submit" onClick={handleLogout}>Cerrar sesión</button>
    </div>
  );
};

export default Profile;
