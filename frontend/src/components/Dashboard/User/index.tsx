import React, { useState, useCallback, useEffect, useMemo } from 'react';
import DayPicker, { DayModifiers } from 'react-day-picker';

import { format } from 'date-fns';
import Slider, { Settings } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import ComponentHeader from '../../Header';

import {
  Container,
  Content,
  Schedule,
  ContentSlider,
  Provider,
  Section,
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
  const [selectedHour, setSelectedHour] = useState(0);
  const [toggleSlider, setToggleSlider] = useState(false);

  const { user } = useAuth();

  const handleMonthChange = useCallback((month: Date) => {
    setCurrentMonth(month);
  }, []);

  const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
    if (modifiers.available && !modifiers.disabled) {
      setSelectedDate(day);
    }
  }, []);

  const handleSelectedProvider = useCallback(
    (id: string) => {
      const alreadySelected = selectedProvider.findIndex((item) => item === id);
      if (alreadySelected >= 0) {
        const filteredItems = selectedProvider.filter((item) => item !== id);
        setSelectedProvider(filteredItems);
      } else {
        setSelectedProvider([id]);
      }
    },
    [selectedProvider],
  );

  const handleSelectHour = useCallback((hour: number) => {
    setSelectedHour(hour);
  }, []);

  const handleToggleSlider = useCallback(() => {
    return setToggleSlider(true);
  }, []);

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

  const morningAvailability = useMemo(() => {
    return availability
      .filter(({ hour }) => hour < 12)
      .map(({ hour, available }) => {
        return {
          hour,
          available,
          hourFormatted: format(new Date().setHours(hour), 'HH:00'),
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
          hourFormatted: format(new Date().setHours(hour), 'HH:00'),
        };
      });
  }, [availability]);

  const settings: Settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    className: 'SliderDiv',
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Container>
      <ComponentHeader />

      <Content>
        <Schedule>
          <h1>Barbeiros</h1>

          <span>
            Selecione um barbeiro para verificar os horários disponíveis.
          </span>

          <ContentSlider>
            <Slider {...settings}>
              {providers.map((dt) => (
                <Provider
                  key={dt.id}
                  onClick={() => handleSelectedProvider(dt.id)}
                  selected={selectedProvider.indexOf(dt.id) >= 0}
                >
                  <img src={dt.avatar_url} alt={dt.name} />
                  <strong>{dt.name}</strong>
                </Provider>
              ))}
            </Slider>
          </ContentSlider>

          <h1>Horários disponíveis</h1>
          <Section>
            <strong>Manhã</strong>
            {morningAvailability.map(({ hourFormatted, available, hour }) => (
              <HourButton
                enabled={available}
                selected={selectedHour === hour}
                available={available}
                key={hourFormatted}
                onClick={() => handleSelectHour(hour)}
              >
                <HourText selected={selectedHour === hour}>
                  {hourFormatted}{' '}
                </HourText>
              </HourButton>
            ))}
          </Section>

          <Section>
            <strong>Tarde</strong>
            {afternoonAvailability.map(({ hourFormatted, available, hour }) => (
              <HourButton
                enabled={available}
                selected={selectedHour === hour}
                available={available}
                key={hourFormatted}
                onClick={() => handleSelectHour(hour)}
              >
                <HourText selected={selectedHour === hour}>
                  {hourFormatted}{' '}
                </HourText>
              </HourButton>
            ))}
          </Section>

          <CreateButton style={{ marginTop: 50 }}>
            Criar agendamento
          </CreateButton>
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
