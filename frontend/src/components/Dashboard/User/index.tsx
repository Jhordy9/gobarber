import React, { useCallback, useState, useMemo } from 'react';

import { useRecoilValue } from 'recoil';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import CreateAppointment from '../../CreateAppointment/index';
import Hair from '../../CreateAppointment/Hair/index';
import Beard from '../../CreateAppointment/Beard/index';
import ComponentHeader from '../../Header';
import { useToast } from '../../../hooks/toast';
import api from '../../../services/api';
import {
  selectedProviderState,
  dateHairState,
  selectedHairState,
  dateBeardState,
  selectedBeardState,
} from '../../../atoms/index';
import {
  Container,
  Content,
  Schedule,
  ConfirmedAppointment,
  Icon,
  Title,
  Description,
  HairDescription,
  BeardDescription,
  OkButton,
  ContentCreateAppointment,
  TypeTitle,
  SectionTypes,
  CreateButton,
} from './styles';

interface CreatedData {
  hair?: boolean;
  beard?: boolean;
}

interface DataOptions {
  date: Date;
}

const User: React.FC = () => {
  const selectedProvider = useRecoilValue(selectedProviderState);
  const dateHair = useRecoilValue(dateHairState);
  const selectedHair = useRecoilValue(selectedHairState);
  const dateBeard = useRecoilValue(dateBeardState);
  const selectedBeard = useRecoilValue(selectedBeardState);
  const { addToast } = useToast();

  const [created, setCreated] = useState<CreatedData>({
    beard: false,
    hair: false,
  });
  const [createdHairData, setCreatedHairData] = useState<DataOptions>();
  const [createdBeardData, setCreatedBeardData] = useState<DataOptions>();

  const handleCreateAppointment = useCallback(async () => {
    if (selectedBeard === 'Barba') {
      try {
        const { data } = await api.post('appointments', {
          provider_id: selectedProvider.toString(),
          date: dateBeard,
          type: selectedBeard,
        });

        setCreatedBeardData(data);

        setCreated({ beard: true });

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
    }

    if (selectedHair === 'Cabelo') {
      try {
        const { data } = await api.post('appointments', {
          provider_id: selectedProvider.toString(),
          date: dateHair,
          type: selectedHair,
        });

        setCreatedHairData(data);

        setCreated({ hair: true });

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
    }
  }, [
    addToast,
    dateBeard,
    selectedBeard,
    selectedProvider,
    dateHair,
    selectedHair,
  ]);

  // eslint-disable-next-line consistent-return
  const createdHairDescription = useMemo(() => {
    if (createdHairData) {
      return format(
        new Date(createdHairData.date),
        "'Cabelo agendado para o dia 'dd' de 'MMMM' de 'yyyy 'às 'HH:mm'h'",
        { locale: ptBR },
      );
    }
  }, [createdHairData]);

  // eslint-disable-next-line consistent-return
  const createdBeardDescription = useMemo(() => {
    if (createdBeardData) {
      return format(
        new Date(createdBeardData.date),
        "'Barba agendada para o dia 'dd' de 'MMMM' de 'yyyy 'às 'HH:mm'h'",
        { locale: ptBR },
      );
    }
  }, [createdBeardData]);

  return (
    <Container>
      <ComponentHeader />
      <Content>
        <ConfirmedAppointment
          enabled={created.beard === true || created.hair === true}
        >
          <Icon size={46} color="#04d361" />
          <Title>Agendamento concluído!</Title>
          <Description>
            <HairDescription>{createdHairDescription}</HairDescription>
            <BeardDescription>{createdBeardDescription}</BeardDescription>
          </Description>

          <OkButton onClick={() => window.location.reload(true)}>OK</OkButton>
        </ConfirmedAppointment>
        <Schedule enabled={created.beard === true || created.hair === true}>
          <CreateAppointment />

          <ContentCreateAppointment>
            <TypeTitle>
              Serviços e horários
              <h2>Selecione o serviço desejado e posteriormente o horário.</h2>
            </TypeTitle>
            <SectionTypes>
              <Hair />
              <Beard />
            </SectionTypes>
            <CreateButton
              style={{ marginTop: 50 }}
              onClick={handleCreateAppointment}
            >
              Criar agendamento
            </CreateButton>
          </ContentCreateAppointment>
        </Schedule>
      </Content>
    </Container>
  );
};

export default User;
