import React from 'react';

import CreateAppointment from '../../CreateAppointment/index';
import Hair from '../../CreateAppointment/Hair/index';
import Beard from '../../CreateAppointment/Beard/index';
import ComponentHeader from '../../Header';

import {
  Container,
  Content,
  Schedule,
  ContentCreateAppointment,
  TypeTitle,
  SectionTypes,
} from './styles';

const User: React.FC = () => {
  return (
    <Container>
      <ComponentHeader />
      <Content>
        <Schedule>
          <CreateAppointment />

          <ContentCreateAppointment>
            <TypeTitle>
              Serviços e horários
              <h2>Selecione o serviço desejado e posteriormente o horário.</h2>
            </TypeTitle>
          </ContentCreateAppointment>
          <SectionTypes>
            <Hair />
            <Beard />
          </SectionTypes>
        </Schedule>
      </Content>
    </Container>
  );
};

export default User;
