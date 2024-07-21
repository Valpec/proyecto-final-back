import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../../services/auth.service';
import './Register.css';

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register({ firstName, lastName, age, email, password });
      navigate('/login');
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    <div className="register-container">
      <h2>Registrar nuevo usuario</h2>
      <form id="formRegister" onSubmit={handleSubmit}>
        <label htmlFor="firstName">Nombre:</label>
        <input
          name="firstName"
          type="text"
          className="input"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <label htmlFor="lastName">Apellido:</label>
        <input
          name="lastName"
          type="text"
          className="input"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <label htmlFor="age">Edad:</label>
        <input
          name="age"
          type="text"
          className="input"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <label htmlFor="email">Email:</label>
        <input
          name="email"
          type="text"
          className="input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Contraseña:</label>
        <input
          name="password"
          type="password"
          className="input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input type="submit" value="Registrar" className="submit-button" />
      </form>
      <p>¿Ya tienes una cuenta? <Link to="/login">Ingresa aquí</Link></p>
    </div>
  );
};

export default Register;
