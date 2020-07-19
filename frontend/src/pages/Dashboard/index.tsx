import React from 'react';

import Barber from '../../components/Dashboard/Barber';
import User from '../../components/Dashboard/User';

import { Container } from './styles';
import { useAuth } from '../../hooks/auth';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <Container>
      {user.category === 'Barbeiro' && <Barber />}
      {user.category === 'Cliente' && <User />}
    </Container>
  );
};

export default Dashboard;
