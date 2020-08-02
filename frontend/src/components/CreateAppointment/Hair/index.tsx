/* eslint-disable react/jsx-curly-newline */
import React, { useState, useCallback, useEffect, useMemo } from 'react';

import { format } from 'date-fns';
import { useRecoilValue, useRecoilState } from 'recoil';

import { useToast } from '../../../hooks/toast';
import {
  selectedProviderState,
  selectedDateState,
  availabilityState,
  selectedBeardHourState,
  selectedHairHourState,
} from '../../../atoms/index';

import {
  Container,
  ContentCreateAppointment,
  TypeButton,
  TypeText,
  Section,
  SectionHair,
  ContentMorning,
  ContentAfternoon,
  HourButton,
  HourText,
  CreateButton,
} from './styles';
import api from '../../../services/api';

const Hair: React.FC = () => {
  const selectedProvider = useRecoilValue(selectedProviderState);
  const selectedDate = useRecoilValue(selectedDateState);
  const availability = useRecoilValue(availabilityState);
  const selectedHairHour = useRecoilValue(selectedHairHourState);
  const selectedBeardHour = useRecoilValue(selectedBeardHourState);

  const [editSelectedHairHour, setEditSelectedHairHour] = useRecoilState(
    selectedHairHourState,
  );
  const [selectedHair, setSelectedHair] = useState('');
  const [dateHair, setDateHair] = useState(new Date());

  const { addToast } = useToast();

  const handleSelectHairHour = useCallback(
    (hour: any, available: boolean) => {
      const thirtyHourPAR = hour.slice(3);

      if (available === true && hour !== selectedBeardHour) {
        if (thirtyHourPAR === '00' || thirtyHourPAR === '30') {
          setEditSelectedHairHour(hour);
        }

        if (hour === selectedHairHour) {
          setEditSelectedHairHour('50');
        }
      }
    },
    [selectedHairHour, setEditSelectedHairHour, selectedBeardHour],
  );

  const handleSelectHair = useCallback(() => {
    if (selectedHair === '') {
      setSelectedHair('Cabelo');
    } else if (selectedHair === 'Cabelo') {
      setSelectedHair('');
    }
  }, [selectedHair]);

  useEffect(() => {
    const date = new Date(selectedDate);

    const arrayHair = [];
    arrayHair.push(selectedHairHour);

    const fullHairHour: any = arrayHair.toString().slice(0, 2);
    const halfHairHour: any = arrayHair.toString().slice(3);

    if (halfHairHour === '00') {
      date.setHours(fullHairHour);
      date.setMinutes(0);

      setDateHair(date);
    } else if (halfHairHour === '30') {
      date.setHours(fullHairHour);
      date.setMinutes(30);

      setDateHair(date);
    } else if (selectedHairHour === '50') {
      setDateHair(new Date());
    }
  }, [selectedDate, selectedHairHour]);

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
      await api.post('appointments', {
        provider_id: selectedProvider.toString(),
        date: dateHair,
        type: selectedHair,
      });

      addToast({
        type: 'success',
        title: 'Agendamento criado.',
        description: 'Serviço de barba agendadado com sucesso!',
      });
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro na criação do agendamento',
        description: 'Selecione o serviço/horário',
      });
    }
  }, [addToast, dateHair, selectedHair, selectedProvider]);

  return (
    <Container>
      <ContentCreateAppointment>
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
                    style={{ marginLeft: 16 }}
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
                    style={{ marginLeft: 16 }}
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
        </Section>

        <CreateButton
          style={{ marginTop: 50 }}
          onClick={handleCreateAppointment}
        >
          Criar agendamento
        </CreateButton>
      </ContentCreateAppointment>
    </Container>
  );
};

export default Hair;
