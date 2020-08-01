/* eslint-disable react/jsx-curly-newline */
import React, { useState, useCallback, useEffect, useMemo } from 'react';
import DayPicker, { DayModifiers } from 'react-day-picker';

import { format, isFuture } from 'date-fns';
import Slider, { Settings } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { useToast } from '../../../hooks/toast';

import {
  Container,
  ContentSlider,
  Provider,
  ContentCreateAppointment,
  TypeTitle,
  TypeButton,
  TypeText,
  Section,
  SectionHair,
  SectionBeard,
  ContentMorning,
  ContentAfternoon,
  HourButton,
  HourText,
  CreateButton,
  Calendar,
} from './styles';
import { useAuth } from '../../../hooks/auth';
import api from '../../../services/api';

interface MonthAvailabilityItem {
  day: number;
  available: boolean;
}

interface ProviderData {
  id: string;
  name: string;
  avatar_url: string;
  category: string;
}

interface AvailabilityItem {
  hour: number;
  available: boolean;
}

const User: React.FC = () => {
  const [providers, setProviders] = useState<ProviderData[]>([]);
  const [selectedProvider, setSelectedProvider] = useState<string[]>([]);
  const [availability, setAvailability] = useState<AvailabilityItem[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [monthAvailabilty, setMonthAvailability] = useState<
    MonthAvailabilityItem[]
  >([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedHairHour, setSelectedHairHour] = useState('50');
  const [selectedBeardHour, setSelectedBeardHour] = useState('50');
  const [selectedHair, setSelectedHair] = useState('');
  const [selectedBeard, setSelectedBeard] = useState('');
  const [dateHair, setDateHair] = useState(new Date());
  const [dateBeard, setDateBeard] = useState(new Date());

  const { user } = useAuth();
  const { addToast } = useToast();

  const handleSelectBeardHour = useCallback(
    (hour: any, available: boolean) => {
      const thirtyHourPAR = hour.slice(3);

      if (available === true && hour !== selectedHairHour) {
        if (thirtyHourPAR === '00' || thirtyHourPAR === '30') {
          setSelectedBeardHour(hour);
        }

        if (hour === selectedBeardHour) {
          setSelectedBeardHour('50');
        }
      }
    },
    [selectedBeardHour, selectedHairHour],
  );

  const handleSelectBeard = useCallback(() => {
    if (selectedBeard === '') {
      setSelectedBeard('Barba');
    } else if (selectedBeard === 'Barba') {
      setSelectedBeard('');
    }
  }, [selectedBeard]);

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

  useEffect(() => {
    async function loadProviders(): Promise<void> {
      const { data } = await api.get<ProviderData[]>('/providers');

      const listProviders = data.filter((dt) => {
        return dt.category === 'Barbeiro';
      });

      setProviders(listProviders);
    }

    loadProviders();
  }, []);

  useEffect(() => {
    api
      .get(`providers/${selectedProvider}/day-availability`, {
        params: {
          year: selectedDate.getFullYear(),
          month: selectedDate.getMonth() + 1,
          day: selectedDate.getDate(),
        },
      })
      .then((response) => {
        setAvailability(response.data);
      });
  }, [selectedDate, selectedProvider]);

  useEffect(() => {
    const date = new Date(selectedDate);

    const arrayBeard = [];
    arrayBeard.push(selectedBeardHour);

    const fullBeardHour: any = arrayBeard.toString().slice(0, 2);
    const halfBeardHour: any = arrayBeard.toString().slice(3);

    if (halfBeardHour === '00') {
      date.setHours(fullBeardHour);
      date.setMinutes(0);

      setDateBeard(date);
    } else if (halfBeardHour === '30') {
      date.setHours(fullBeardHour);
      date.setMinutes(30);

      setDateBeard(date);
    } else if (selectedBeardHour === '50') {
      setDateBeard(new Date());
    }
  }, [selectedDate, selectedBeardHour]);

  const morningAvailability = useMemo(() => {
    return availability
      .filter(({ hour }) => hour < 12)
      .map(({ hour, available }) => {
        return {
          hour,
          available,
          fullHourFormatted: format(new Date().setHours(hour), 'HH:00'),
          halfHourFormatted: format(new Date().setHours(hour), 'HH:30'),
        };
      });
  }, [availability]);

  const afternoonAvailability = useMemo(() => {
    return availability
      .filter(({ hour }) => hour >= 12)
      .map(({ hour, available }) => {
        return {
          hour,
          available,
          fullHourFormatted: format(new Date().setHours(hour), 'HH:00'),
          halfHourFormatted: format(new Date().setHours(hour), 'HH:30'),
        };
      });
  }, [availability]);

  return (
    <Container>
      <ContentCreateAppointment>
        <Section>
          <SectionBeard>
            <TypeButton
              selectedBeard={selectedBeard === 'Barba'}
              onClick={handleSelectBeard}
            >
              <TypeText selected={selectedBeard === 'Barba'}>Barba</TypeText>
            </TypeButton>

            <strong>Manhã</strong>
            {morningAvailability.map(
              ({ fullHourFormatted, halfHourFormatted, available }) => (
                <ContentMorning>
                  <HourButton
                    enabled={available}
                    selectedBeard={selectedBeardHour === fullHourFormatted}
                    available={available}
                    key={fullHourFormatted}
                    onClick={() =>
                      handleSelectBeardHour(fullHourFormatted, available)
                    }
                  >
                    <HourText
                      selected={selectedBeardHour === fullHourFormatted}
                    >
                      {fullHourFormatted}{' '}
                    </HourText>
                  </HourButton>

                  <HourButton
                    enabled={available}
                    selectedBeard={selectedBeardHour === halfHourFormatted}
                    available={available}
                    key={halfHourFormatted}
                    onClick={() =>
                      handleSelectBeardHour(halfHourFormatted, available)
                    }
                  >
                    <HourText
                      selected={selectedBeardHour === halfHourFormatted}
                    >
                      {halfHourFormatted}{' '}
                    </HourText>
                  </HourButton>
                </ContentMorning>
              ),
            )}

            <strong>Tarde</strong>
            {afternoonAvailability.map(
              ({ fullHourFormatted, halfHourFormatted, available }) => (
                <ContentAfternoon>
                  <HourButton
                    enabled={available}
                    selectedBeard={selectedBeardHour === fullHourFormatted}
                    available={available}
                    key={fullHourFormatted}
                    onClick={() =>
                      handleSelectBeardHour(fullHourFormatted, available)
                    }
                  >
                    <HourText
                      selected={selectedBeardHour === fullHourFormatted}
                    >
                      {fullHourFormatted}{' '}
                    </HourText>
                  </HourButton>

                  <HourButton
                    enabled={available}
                    selectedBeard={selectedBeardHour === halfHourFormatted}
                    available={available}
                    key={halfHourFormatted}
                    onClick={() =>
                      handleSelectBeardHour(halfHourFormatted, available)
                    }
                  >
                    <HourText
                      selected={selectedBeardHour === halfHourFormatted}
                    >
                      {halfHourFormatted}{' '}
                    </HourText>
                  </HourButton>
                </ContentAfternoon>
              ),
            )}
          </SectionBeard>
        </Section>
      </ContentCreateAppointment>
    </Container>
  );
};

export default User;
