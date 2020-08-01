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

export const SectionBeard = styled.div`
  max-width: 560px;
  height: 100%;
`;

export const ContentSlider = styled.div`
  max-width: 950px;

  background: #3e3b47;
  align-items: center;
  padding: 16px 24px;
  border-radius: 10px;
  margin-top: 24px;
  align-items: center;

  .SliderDiv {
    height: 150px;

    .slick-slide {
      width: 210px !important;
      margin-right: 16px;
    }
  }
`;

export const Provider = styled.button<DataProps>`
  padding: 16px 24px;
  border-radius: 10px;
  border: 1px solid #ff9000;

  background: ${(props) => (props.selected ? '#232139' : '#3e3b47')};

  & {
    margin-right: 16px;
  }

  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    margin-bottom: 10px;
    margin-left: 0 auto;
    margin-right: 0 auto;
  }

  strong {
    color: #fff;
    font-size: 20px;
    text-align: center;
  }

  &:hover {
    background: ${shade(0.2, '#3e3b47')};
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

export const TypeTitle = styled.h1`
  font-size: 32px;
  margin-top: 32px;
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

export const CreateButton = styled(Button)`
  font-size: 22px;
`;

export const Calendar = styled.aside`
  width: 380px;

  .DayPicker {
    background: #28262e;
    border-radius: 10px;
  }

  .DayPicker-wrapper {
    padding-bottom: 0;
  }

  .DayPicker,
  .DayPicker-Month {
    width: 100%;
  }

  .DayPicker-Month {
    border-collapse: separate;
    border-spacing: 8px;
    margin: 16px;
  }

  .DayPicker-Day {
    width: 40px;
    height: 40px;
  }

  .DayPicker-Day--available:not(.DayPicker-Day--outside) {
    background: #3e3b47;
    border-radius: 10px;
    color: #fff;
  }

  .DayPicker:not(.DayPicker--interactionDisabled)
    .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover {
    background: ${shade(0.2, '#3e3b47')};
  }

  .DayPicker-Day--today {
    font-weight: normal;
  }

  .DayPicker-Day--disabled {
    color: #666360 !important;
    background: transparent !important;
  }

  .DayPicker-Day--selected {
    background: #ff9000 !important;
    border-radius: 10px;
    color: #232129 !important;
  }
`;
