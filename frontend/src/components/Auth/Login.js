import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Link , useNavigate} from 'react-router-dom';
import './Login.css';

const Login = () => {
  const { loginUser } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginUser(email, password);
      navigate('/products');
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="login-container">
      <h2>Cattalina Deco-Home</h2>
      <form id="formLogin" onSubmit={handleSubmit}>
        <label htmlFor="email"> Email: </label>
        <input
          name="email"
          type="text"
          className="input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Contraseña: </label>
        <input
          name="password"
          type="password"
          className="input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input type="submit" value="Iniciar Sesión" className="submit-button" />
      </form>
      <p>¿No tienes una cuenta? <Link to="/register">Regístrate aquí</Link></p>
      <p>¿Tienes una cuenta en Github? <a href="/api/sessions/github">Login por Github</a></p>
      <a href="/api/email/resetPasswordRequest">
        <button className="reset-button">Olvidaste tu contraseña?</button>
      </a>
    </div>
  );
};

export default Login;
