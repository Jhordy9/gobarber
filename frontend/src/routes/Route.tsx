import React from 'react';
import {
  RouteProps as ReactDOMRouteProps,
  Route as ReactDOMRoute,
  Redirect,
} from 'react-router-dom';

import { useAuth } from '../hooks/auth';

interface RouteProps extends ReactDOMRouteProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}
/**
 * true/true = Rota privada/Usuário auth = OK
 * true/false = Rota privada/Usuário não auth = Redirecionar p login
 * false/true = Rota não privada/Usuário auth = Redirecionar p dashboard
 * false/false = Rota não privada/ Usuário não auth = OK
 */
const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const { user } = useAuth();

  return (
    <ReactDOMRoute
      {...rest}
      render={({ location }) => {
        return isPrivate === !!user ? (
          <Component />
        ) : (
            <Redirect to={{
              pathname: isPrivate ? '/' : '/dashboard',
              state: { from: location },
            }} />
          );
      }}
    />
  );
};

export default Route;
