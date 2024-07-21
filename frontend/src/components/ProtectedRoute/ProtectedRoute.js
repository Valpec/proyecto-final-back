import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { currentUser } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={props =>
        currentUser ? (
          <Component {...props} />
        ) : (
          <Redirect to="/*" />
        )
      }
    />
  );
};

export default ProtectedRoute;
