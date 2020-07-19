import React, { useState, useCallback, useEffect, useMemo } from 'react';
import DayPicker, { DayModifiers } from 'react-day-picker';
import { useParams, useRouteMatch } from 'react-router-dom';

import { isToday, format, parseISO, isAfter } from 'date-fns';
import { FiClock } from 'react-icons/fi';

import ptBR from 'date-fns/locale/pt-BR';
import 'react-day-picker/lib/style.css';

import ComponentHeader from '../../Header';
import ComponentSlider from '../../Slider';

import {
  Container,
  Content,
  Schedule,
  Section,
  HourButton,
  Calendar,
} from './styles';
import { useAuth } from '../../../hooks/auth';
import api from '../../../services/api';

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

interface RouteParams {
  providerId: string;
}

const User: React.FC = () => {
  const route = useParams();
  const route2 = useRouteMatch();

  const routeParams = route as RouteParams;
  const routeParams2 = route2.params as RouteParams;

  const [monthAvailabilty, setMonthAvailability] = useState<
    MonthAvailabilityItem[]
  >([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedProvider, setSelectedProvider] = useState(
    routeParams2.providerId,
  );
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const { user } = useAuth();

  const handleMonthChange = useCallback((month: Date) => {
    setCurrentMonth(month);
  }, []);

  const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
    if (modifiers.available && !modifiers.disabled) {
      setSelectedDate(day);
    }
  }, []);

  const handleSelectedProvider = useCallback((providerId: string) => {
    setSelectedProvider(providerId);
  }, []);

  console.log(selectedProvider);

  useEffect(() => {
    api
      .get(`/providers/${user.id}/month-availability`, {
        params: {
          year: currentMonth.getFullYear(),
          month: currentMonth.getMonth() + 1,
        },
      })
      .then((response) => {
        setMonthAvailability(response.data);
      });
  }, [currentMonth, user.id]);

  // useEffect(() => {
  //   api.get();
  // }, []);

  const disableDays = useMemo(() => {
    const dates = monthAvailabilty
      .filter((monthDay) => monthDay.available === false)
      .map((mothDay) => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();
        return new Date(year, month, mothDay.day);
      });

    return dates;
  }, [currentMonth, monthAvailabilty]);

  return (
    <Container>
      <ComponentHeader />

      <Content>
        <Schedule>
          <h1>Barbeiros</h1>

          <ComponentSlider />

          <Section>
            <h1>Horários disponíveis</h1>

            <strong>Manhã</strong>
            <HourButton onClick={() => handleSelectedProvider}>8:00</HourButton>
            <HourButton>9:00</HourButton>
            <HourButton>10:00</HourButton>
            <HourButton>11:00</HourButton>
            <HourButton>12:00</HourButton>
          </Section>

          <Section>
            <strong>Tarde</strong>
            <HourButton>13:00</HourButton>
            <HourButton>14:00</HourButton>
            <HourButton>15:00</HourButton>
            <HourButton>16:00</HourButton>
            <HourButton>17:00</HourButton>
          </Section>
        </Schedule>
        <Calendar>
          <DayPicker
            weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
            fromMonth={new Date()}
            disabledDays={[{ daysOfWeek: [0, 6] }, ...disableDays]}
            modifiers={{ available: { daysOfWeek: [1, 2, 3, 4, 5] } }}
            onMonthChange={handleMonthChange}
            selectedDays={selectedDate}
            onDayClick={handleDateChange}
            months={[
              'Janeiro',
              'Fevereiro',
              'Março',
              'Abril',
              'Maio',
              'Junho',
              'Julho',
              'Agosto',
              'Setembro',
              'Outubro',
              'Novembro',
              'Dezembro',
            ]}
          />
        </Calendar>
      </Content>
    </Container>
  );
};

export default User;
