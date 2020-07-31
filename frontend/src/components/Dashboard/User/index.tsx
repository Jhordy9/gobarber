/* eslint-disable react/jsx-curly-newline */
import React, { useState, useCallback, useEffect, useMemo } from 'react';
import DayPicker, { DayModifiers } from 'react-day-picker';

import { format } from 'date-fns';
import Slider, { Settings } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import ComponentHeader from '../../Header';
import { useToast } from '../../../hooks/toast';

import {
  Container,
  Content,
  Schedule,
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

  const handleSelectHairHour = useCallback(
    (hour: any, available: boolean) => {
      const thirtyHourPAR = hour.slice(3);

      if (available === true && hour !== selectedBeardHour) {
        if (thirtyHourPAR === '00' || thirtyHourPAR === '30') {
          setSelectedHairHour(hour);
        }

        if (hour === selectedHairHour) {
          setSelectedHairHour('50');
        }
      }
    },
    [selectedHairHour, selectedBeardHour],
  );

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

  const handleSelectHair = useCallback(() => {
    if (selectedHair === '') {
      setSelectedHair('Cabelo');
    } else if (selectedHair === 'Cabelo') {
      setSelectedHair('');
    }
  }, [selectedHair]);

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

    const arrayHair = [];
    const arrayBeard = [];
    arrayHair.push(selectedHairHour);
    arrayBeard.push(selectedBeardHour);

    const fullHairHour: any = arrayHair.toString().slice(0, 2);
    const halfHairHour: any = arrayHair.toString().slice(3);

    const fullBeardHour: any = arrayBeard.toString().slice(0, 2);
    const halfBeardHour: any = arrayBeard.toString().slice(3);

    if (halfHairHour === '00') {
      date.setHours(fullHairHour);
      date.setMinutes(0);

      setDateHair(date);
    } else if (halfHairHour === '30') {
      date.setHours(fullHairHour);
      date.setMinutes(30);

      setDateHair(date);
    }

    if (halfBeardHour === '00') {
      date.setHours(fullBeardHour);
      date.setMinutes(0);

      setDateBeard(date);
    } else if (halfBeardHour === '30') {
      date.setHours(fullBeardHour);
      date.setMinutes(30);

      setDateBeard(date);
    }
  }, [selectedDate, selectedHairHour, selectedBeardHour]);

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

  const handleCreateAppointment = useCallback(async () => {
    try {
      if (selectedHair === 'Cabelo') {
        await api.post('appointments', {
          provider_id: selectedProvider.toString(),
          date: dateHair,
          type: selectedHair,
        });

        addToast({
          type: 'success',
          title: 'Agendamento criado.',
          description: 'Agendamento criado com sucesso!',
        });
      }

      if (selectedBeard === 'Barba') {
        await api.post('appointments', {
          provider_id: selectedProvider.toString(),
          date: dateBeard,
          type: selectedBeard,
        });

        addToast({
          type: 'success',
          title: 'Agendamento criado.',
          description: 'Agendamento criado com sucesso!',
        });
      }
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro na criação do agendamento',
        description:
          'Ocorreu algum erro ao criar o agendamento, tente novamente',
      });
    }
  }, [
    addToast,
    dateHair,
    dateBeard,
    selectedHair,
    selectedBeard,
    selectedProvider,
  ]);

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

          <ContentCreateAppointment>
            <TypeTitle>
              Serviços e horários
              <h2>Selecione o serviço desejado e posteriormente o horário.</h2>
            </TypeTitle>
            <Section>
              <SectionHair>
                <TypeButton
                  selectedHair={selectedHair === 'Cabelo'}
                  onClick={handleSelectHair}
                >
                  <TypeText>Cabelo</TypeText>
                </TypeButton>

                <strong>Manhã</strong>
                {morningAvailability.map(
                  ({ fullHourFormatted, halfHourFormatted, available }) => (
                    <ContentMorning>
                      <HourButton
                        enabled={available}
                        selectedHair={selectedHairHour === fullHourFormatted}
                        available={available}
                        key={fullHourFormatted}
                        onClick={() =>
                          handleSelectHairHour(fullHourFormatted, available)
                        }
                      >
                        <HourText>{fullHourFormatted} </HourText>
                      </HourButton>

                      <HourButton
                        enabled={available}
                        selectedHair={selectedHairHour === halfHourFormatted}
                        available={available}
                        key={halfHourFormatted}
                        onClick={() =>
                          handleSelectHairHour(halfHourFormatted, available)
                        }
                      >
                        <HourText>{halfHourFormatted} </HourText>
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
                        selectedHair={selectedHairHour === fullHourFormatted}
                        available={available}
                        key={fullHourFormatted}
                        onClick={() =>
                          handleSelectHairHour(fullHourFormatted, available)
                        }
                      >
                        <HourText>{fullHourFormatted} </HourText>
                      </HourButton>

                      <HourButton
                        enabled={available}
                        selectedHair={selectedHairHour === halfHourFormatted}
                        available={available}
                        key={halfHourFormatted}
                        onClick={() =>
                          handleSelectHairHour(halfHourFormatted, available)
                        }
                      >
                        <HourText>{halfHourFormatted} </HourText>
                      </HourButton>
                    </ContentAfternoon>
                  ),
                )}
              </SectionHair>

              <SectionBeard>
                <TypeButton
                  selectedBeard={selectedBeard === 'Barba'}
                  onClick={handleSelectBeard}
                >
                  <TypeText selected={selectedBeard === 'Barba'}>
                    Barba
                  </TypeText>
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

            <CreateButton
              style={{ marginTop: 50 }}
              onClick={handleCreateAppointment}
            >
              Criar agendamento
            </CreateButton>
          </ContentCreateAppointment>
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
