import React, { useState, useCallback, useEffect, useMemo } from 'react';
import DayPicker, { DayModifiers } from 'react-day-picker';

import { useRecoilState, useRecoilValue } from 'recoil';
import Slider, { Settings } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import {
  Container,
  Content,
  Schedule,
  ContentSlider,
  Provider,
  Calendar,
} from './styles';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';
import { availabilityState, selectedProviderState } from '../../atoms/index';

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

const CreateAppointment: React.FC = () => {
  const selectedProvider = useRecoilValue(selectedProviderState);

  const [editAvailability, setEditAvailability] = useRecoilState(
    availabilityState,
  );
  const [editSelectedProvider, setEditSelectedProvider] = useRecoilState(
    selectedProviderState,
  );

  const [providers, setProviders] = useState<ProviderData[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [monthAvailabilty, setMonthAvailability] = useState<
    MonthAvailabilityItem[]
  >([]);
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

  const handleSelectedProvider = useCallback(
    (id: string) => {
      const alreadySelected = selectedProvider.findIndex((item) => item === id);
      if (alreadySelected >= 0) {
        const filteredItems = selectedProvider.filter((item) => item !== id);
        setEditSelectedProvider(filteredItems);
      } else if (selectedProvider) {
        setEditSelectedProvider([id]);
      }
    },
    [selectedProvider, setEditSelectedProvider],
  );

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
        setEditAvailability(response.data);
      });
  }, [selectedDate, selectedProvider, setEditAvailability]);

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
      <Content>
        <Schedule>
          <h1>Barbeiros</h1>

          <h2>Selecione um barbeiro para verificar os horários disponíveis.</h2>

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

export default CreateAppointment;
