import React from 'react';

import Barber from '../../components/Dashboard/Barber';
import User from '../../components/Dashboard/User';

import { Container } from './styles';
import { useAuth } from '../../hooks/auth';

interface MonthAvailabilityItem {
  day: number;
  available: boolean;
}

interface Appointment {
  id: string;
  date: string;
  hourFormatted: string;
  user: {
    name: string;
    avatar_url: string;
  };
}

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
