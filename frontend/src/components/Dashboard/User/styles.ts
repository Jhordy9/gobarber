import styled from 'styled-components';
import { FiCheck } from 'react-icons/fi';

import Button from '../../Button';

interface DataProps {
  enabled: boolean;
}

export const Container = styled.div``;

export const Content = styled.main`
  max-width: 1120px;
  margin: 64px auto;
  display: flex;
`;

export const Schedule = styled.div<DataProps>`
  max-width: 950px;

  display: ${(props) => (props.enabled ? 'none' : 'block')};
`;

export const ConfirmedAppointment = styled.div<DataProps>`
  background: #312e38;
  width: 100%;
  height: 100%;

  display: ${(props) => (props.enabled ? 'flex' : 'none')};

  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 24px;
`;
export const Icon = styled(FiCheck)``;

export const Title = styled.h1`
  font-size: 32px;
  color: #f4ede8;
  font-weight: 500;
  margin: 48px 0 10px;
  text-align: center;
`;

export const Description = styled.div`
  margin-top: 16px;
  text-align: center;
`;

export const HairDescription = styled.h2`
  font-weight: 400;
  font-size: 18px;
  color: #999591;
  margin-bottom: 8px;
`;

export const BeardDescription = styled.h2`
  font-weight: 400;
  font-size: 18px;
  color: #999591;
  margin-bottom: 20px;
`;

export const OkButton = styled(Button)`
  max-width: 200px;
  font-weight: 500;
  font-size: 26px;
  color: #232129;
`;

export const ContentCreateAppointment = styled.section`
  text-align: center;
  margin-top: 0px;

  h2 {
    font-size: 18px;
    color: #999591;
    font-weight: 400;
  }
`;

export const TypeTitle = styled.h1`
  font-size: 32px;
  margin-top: 32px;
`;

export const SectionTypes = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

export const CreateButton = styled(Button)`
  font-size: 22px;
  font-weight: 500;
`;
