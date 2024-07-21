import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Profile = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <nav>
        <ul>
          <li><Link to="/products">Ver Productos</Link></li>
          <li><Link to="/realTimeProducts">Administrar Productos</Link></li>
          <li><Link to={`/carts/${user.cart}`}>Ver carrito *</Link></li>
          <li><Link to="/profile">Perfil</Link></li>
        </ul>
      </nav>
      <div>
        <h1>Tu perfil:</h1>
        <p>{user.name}</p>
        <p>{user.email}</p>
        <p>{user.age}</p>
        <h5>Su rol actual: {user.role}</h5>
        <p>Desea cambiarlo?</p>
        <Link to={`/api/users/premium/${user.id}`}><button>Cambiar rol</button></Link>
        <Link to="/documents"><button>Subir archivos</button></Link>
        <Link to="/api/sessions/logout"><button>Cerrar sesión</button></Link>
      </div>
    </div>
  );
};

export default Profile;
