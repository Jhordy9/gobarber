/* eslint-disable react/jsx-curly-newline */
import React, { useCallback, useEffect, useMemo } from 'react';

import { useRecoilValue, useRecoilState } from 'recoil';

import {
  selectedProviderState,
  selectedDateState,
  availabilityState,
  selectedBeardHourState,
  selectedHairHourState,
  dateHairState,
  selectedHairState,
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
} from './styles';

const Hair: React.FC = () => {
  const selectedProvider = useRecoilValue(selectedProviderState);
  const selectedDate = useRecoilValue(selectedDateState);
  const availability = useRecoilValue(availabilityState);
  const selectedHairHour = useRecoilValue(selectedHairHourState);
  const selectedBeardHour = useRecoilValue(selectedBeardHourState);
  const dateHair = useRecoilValue(dateHairState);
  const selectedHair = useRecoilValue(selectedHairState);

  const [editSelectedHairHour, setEditSelectedHairHour] = useRecoilState(
    selectedHairHourState,
  );
  const [editDateHair, setEditDateHair] = useRecoilState(dateHairState);
  const [editSelectedHair, setEditSelectedHair] = useRecoilState(
    selectedHairState,
  );

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
      setEditSelectedHair('Cabelo');
    } else if (selectedHair === 'Cabelo') {
      setEditSelectedHair('');
    }
  }, [selectedHair, setEditSelectedHair]);

  useEffect(() => {
    const date = new Date(selectedDate);

    const arrayHair = [];
    arrayHair.push(selectedHairHour);

    const fullHairHour: any = arrayHair.toString().slice(0, 2);
    const halfHairHour: any = arrayHair.toString().slice(3);

    if (halfHairHour === '00') {
      date.setHours(fullHairHour);
      date.setMinutes(0);

      setEditDateHair(date);
    } else if (halfHairHour === '30') {
      date.setHours(fullHairHour);
      date.setMinutes(30);

      setEditDateHair(date);
    } else if (selectedHairHour === '50') {
      setEditDateHair(new Date());
    }
  }, [selectedDate, selectedHairHour, setEditDateHair]);

  const morningAvailability = useMemo(() => {
    return availability
      .filter(({ hour }) => hour < 12)
      .map(({ fullHour, halfHour, fullHourAvailable, halfHourAvailable }) => {
        return {
          halfHourAvailable,
          fullHourAvailable,
          fullHourFormatted: fullHour,
          halfHourFormatted: halfHour,
        };
      });
  }, [availability]);

  const afternoonAvailability = useMemo(() => {
    return availability
      .filter(({ hour }) => hour >= 12)
      .map(({ fullHour, halfHour, fullHourAvailable, halfHourAvailable }) => {
        return {
          halfHourAvailable,
          fullHourAvailable,
          fullHourFormatted: fullHour,
          halfHourFormatted: halfHour,
        };
      });
  }, [availability]);

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
            {selectedHair === 'Cabelo' &&
              morningAvailability.map(
                ({
                  fullHourFormatted,
                  halfHourFormatted,
                  fullHourAvailable,
                  halfHourAvailable,
                }) => (
                    <ContentMorning>
                      <HourButton
                        style={{ marginLeft: 16 }}
                        enabled={fullHourAvailable}
                        selectedHair={selectedHairHour === fullHourFormatted}
                        available={fullHourAvailable}
                        key={fullHourFormatted}
                        onClick={() =>
                          handleSelectHairHour(
                            fullHourFormatted,
                            fullHourAvailable,
                          )
                        }
                      >
                        <HourText>{fullHourFormatted} </HourText>
                      </HourButton>

                      <HourButton
                        enabled={halfHourAvailable}
                        selectedHair={selectedHairHour === halfHourFormatted}
                        available={halfHourAvailable}
                        key={halfHourFormatted}
                        onClick={() =>
                          handleSelectHairHour(
                            halfHourFormatted,
                            halfHourAvailable,
                          )
                        }
                      >
                        <HourText>{halfHourFormatted} </HourText>
                      </HourButton>
                    </ContentMorning>
                  ),
              )}

            <strong>Tarde</strong>
            {selectedHair === 'Cabelo' &&
              afternoonAvailability.map(
                ({
                  fullHourFormatted,
                  halfHourFormatted,
                  fullHourAvailable,
                  halfHourAvailable,
                }) => (
                    <ContentAfternoon>
                      <HourButton
                        style={{ marginLeft: 16 }}
                        enabled={fullHourAvailable}
                        selectedHair={selectedHairHour === fullHourFormatted}
                        available={fullHourAvailable}
                        key={fullHourFormatted}
                        onClick={() =>
                          handleSelectHairHour(
                            fullHourFormatted,
                            fullHourAvailable,
                          )
                        }
                      >
                        <HourText>{fullHourFormatted} </HourText>
                      </HourButton>

                      <HourButton
                        enabled={halfHourAvailable}
                        selectedHair={selectedHairHour === halfHourFormatted}
                        available={halfHourAvailable}
                        key={halfHourFormatted}
                        onClick={() =>
                          handleSelectHairHour(
                            halfHourFormatted,
                            halfHourAvailable,
                          )
                        }
                      >
                        <HourText>{halfHourFormatted} </HourText>
                      </HourButton>
                    </ContentAfternoon>
                  ),
              )}
          </SectionHair>
        </Section>
      </ContentCreateAppointment>
    </Container>
  );
};

export default Hair;
