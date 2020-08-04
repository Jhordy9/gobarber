/* eslint-disable react/jsx-curly-newline */
import React, { useCallback, useEffect, useMemo } from 'react';

import { useRecoilValue, useRecoilState } from 'recoil';

import {
  Container,
  ContentCreateAppointment,
  TypeButton,
  TypeText,
  Section,
  SectionBeard,
  ContentMorning,
  ContentAfternoon,
  HourButton,
  HourText,
} from './styles';

import {
  selectedProviderState,
  selectedDateState,
  availabilityState,
  selectedBeardHourState,
  selectedHairHourState,
  dateBeardState,
  selectedBeardState,
} from '../../../atoms/index';

const Beard: React.FC = () => {
  const selectedProvider = useRecoilValue(selectedProviderState);
  const selectedDate = useRecoilValue(selectedDateState);
  const availability = useRecoilValue(availabilityState);
  const selectedHairHour = useRecoilValue(selectedHairHourState);
  const selectedBeardHour = useRecoilValue(selectedBeardHourState);
  const dateBeard = useRecoilValue(dateBeardState);
  const selectedBeard = useRecoilValue(selectedBeardState);

  const [editSelectedBeardHour, setEditSelectedBeardHour] = useRecoilState(
    selectedBeardHourState,
  );
  const [editDateBeard, setEditDateBeard] = useRecoilState(dateBeardState);
  const [editSelectedBeard, setEditSelectedBeard] = useRecoilState(
    selectedBeardState,
  );

  const handleSelectBeardHour = useCallback(
    (hour: any, available: boolean) => {
      const thirtyHourPAR = hour.slice(3);

      if (available === true && hour !== selectedHairHour) {
        if (thirtyHourPAR === '00' || thirtyHourPAR === '30') {
          setEditSelectedBeardHour(hour);
        }

        if (hour === selectedBeardHour) {
          setEditSelectedBeardHour('50');
        }
      }
    },
    [selectedBeardHour, setEditSelectedBeardHour, selectedHairHour],
  );

  const handleSelectBeard = useCallback(() => {
    if (selectedBeard === '') {
      setEditSelectedBeard('Barba');
    } else if (selectedBeard === 'Barba') {
      setEditSelectedBeard('');
    }
  }, [selectedBeard, setEditSelectedBeard]);

  useEffect(() => {
    const date = new Date(selectedDate);

    const arrayBeard = [];
    arrayBeard.push(selectedBeardHour);

    const fullBeardHour: any = arrayBeard.toString().slice(0, 2);
    const halfBeardHour: any = arrayBeard.toString().slice(3);

    if (halfBeardHour === '00') {
      date.setHours(fullBeardHour);
      date.setMinutes(0);

      setEditDateBeard(date);
    } else if (halfBeardHour === '30') {
      date.setHours(fullBeardHour);
      date.setMinutes(30);

      setEditDateBeard(date);
    } else if (selectedBeardHour === '50') {
      setEditDateBeard(new Date());
    }
  }, [selectedDate, selectedBeardHour, setEditDateBeard]);

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
          <SectionBeard>
            <TypeButton
              selectedBeard={selectedBeard === 'Barba'}
              onClick={handleSelectBeard}
            >
              <TypeText selected={selectedBeard === 'Barba'}>Barba</TypeText>
            </TypeButton>

            <strong>Manhã</strong>
            {selectedBeard === 'Barba' &&
              morningAvailability.map(
                ({
                  fullHourFormatted,
                  halfHourFormatted,
                  halfHourAvailable,
                  fullHourAvailable,
                }) => (
                    <ContentMorning>
                      <HourButton
                        style={{ marginLeft: 16 }}
                        enabled={fullHourAvailable}
                        selectedBeard={selectedBeardHour === fullHourFormatted}
                        available={fullHourAvailable}
                        key={fullHourFormatted}
                        onClick={() =>
                          handleSelectBeardHour(
                            fullHourFormatted,
                            fullHourAvailable,
                          )
                        }
                      >
                        <HourText
                          selected={selectedBeardHour === fullHourFormatted}
                        >
                          {fullHourFormatted}{' '}
                        </HourText>
                      </HourButton>

                      <HourButton
                        enabled={halfHourAvailable}
                        selectedBeard={selectedBeardHour === halfHourFormatted}
                        available={halfHourAvailable}
                        key={halfHourFormatted}
                        onClick={() =>
                          handleSelectBeardHour(
                            halfHourFormatted,
                            halfHourAvailable,
                          )
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
            {selectedBeard === 'Barba' &&
              afternoonAvailability.map(
                ({
                  fullHourFormatted,
                  halfHourFormatted,
                  halfHourAvailable,
                  fullHourAvailable,
                }) => (
                    <ContentAfternoon>
                      <HourButton
                        style={{ marginLeft: 16 }}
                        enabled={fullHourAvailable}
                        selectedBeard={selectedBeardHour === fullHourFormatted}
                        available={fullHourAvailable}
                        key={fullHourFormatted}
                        onClick={() =>
                          handleSelectBeardHour(
                            fullHourFormatted,
                            fullHourAvailable,
                          )
                        }
                      >
                        <HourText
                          selected={selectedBeardHour === fullHourFormatted}
                        >
                          {fullHourFormatted}{' '}
                        </HourText>
                      </HourButton>

                      <HourButton
                        enabled={halfHourAvailable}
                        selectedBeard={selectedBeardHour === halfHourFormatted}
                        available={halfHourAvailable}
                        key={halfHourFormatted}
                        onClick={() =>
                          handleSelectBeardHour(
                            halfHourFormatted,
                            halfHourAvailable,
                          )
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

export default Beard;
