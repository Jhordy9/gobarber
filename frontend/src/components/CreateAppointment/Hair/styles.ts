import styled from 'styled-components';
import { shade } from 'polished';

import Button from '../../Button';

interface DataProps {
  selected?: boolean;
  selectedHair?: boolean;
  selectedBeard?: boolean;
  available?: boolean;
  enabled?: boolean;
}

export const Container = styled.div``;

export const SectionHair = styled.div`
  max-width: 560px;
  height: 100%;

  > strong {
    color: #999591;
    font-size: 26px;
    line-height: 26px;
    border-bottom: 1px solid #3e3b47;
    display: block;
    padding-bottom: 16px;
    margin: 48px 0 16px;
  }
`;

export const ContentCreateAppointment = styled.section`
  text-align: center;

  h2 {
    font-size: 18px;
    color: #999591;
    font-weight: 400;
  }
`;

export const Section = styled.div`
  display: flex;
  justify-content: space-around;

  strong {
    color: #999591;
    font-size: 22px;
    line-height: 26px;
    border-bottom: 1px solid #3e3b47;
    display: block;
    padding-bottom: 16px;
    margin: 48px 0 16px;
  }
`;

export const SectionHours = styled.div``;

export const TypeButton = styled.button<DataProps>`
  width: 100px;
  height: 40px;
  border: none;
  border-radius: 6px;
  margin-top: 16px;

  background: ${(props) =>
    // eslint-disable-next-line no-nested-ternary
    props.selectedHair
      ? '#6600ff'
      : '#3e3b47' && props.selectedBeard
        ? '#ff9000'
        : '#3e3b47'};
`;

export const TypeText = styled.text<DataProps>`
  font-family: 400;
  font-size: 22px;

  color: ${(props) => (props.selected ? '#232129' : '#f4ede8')};
`;

export const ContentMorning = styled.div`
  max-width: 560px;
  height: 100%;
`;
export const ContentAfternoon = styled.div`
  max-width: 560px;
  height: 100%;
`;

export const HourButton = styled.button<DataProps>`
  width: 100px;
  height: 40px;
  border: none;
  border-radius: 6px;
  margin: 0 16px 16px 0;

  background: ${(props) =>
    // eslint-disable-next-line no-nested-ternary
    props.selectedHair
      ? '#6600ff'
      : '#3e3b47' && props.selectedBeard
        ? '#ff9000'
        : '#3e3b47'};
  opacity: ${(props) => (props.available ? 1 : 0.3)};
`;

export const HourText = styled.text<DataProps>`
  color: ${(props) => (props.selected ? '#232129' : '#f4ede8')};
  font-weight: 400;
  font-size: 22px;
`;
