import styled from 'styled-components';
import { shade } from 'polished';

import Button from '../../Button';

interface ProviderProps {
  selected: boolean;
}

interface HourProps {
  available: boolean;
  selected: boolean;
  enabled: boolean;
}

interface HourTextProps {
  selected: boolean;
}

export const Container = styled.div``;

export const Content = styled.main`
  max-width: 1120px;
  margin: 64px auto;
  display: flex;
`;

export const Schedule = styled.div`
  flex: 1;
  margin-right: 120px;

  h1 {
    margin-top: 26px;
    font-size: 36px;
  }

  p {
    margin-top: 8px;
    color: #ff9000;
    display: flex;
    align-items: center;
    font-weight: 500;
  }

  span {
    display: flex;
    align-items: center;
  }

  span + span::before {
    content: '';
    width: 1px;
    height: 12px;
    background: #ff9000;
    margin: 0 8px;
  }
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

export const Provider = styled.button<ProviderProps>`
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

export const Section = styled.section`
  margin-top: 48px;

  h1 {
    font-size: 36px;
  }

  > strong {
    color: #999591;
    font-size: 26px;
    line-height: 26px;
    border-bottom: 1px solid #3e3b47;
    display: block;
    padding-bottom: 16px;
    margin-bottom: 16px;
  }
`;

export const HourButton = styled.button<HourProps>`
  width: 100px;
  height: 40px;
  border: none;
  border-radius: 6px;
  margin-right: 16px;

  background: ${(props) => (props.selected ? '#ff9000' : '#3e3b47')};
  opacity: ${(props) => (props.available ? 1 : 0.3)};
`;

export const HourText = styled.span<HourTextProps>`
  color: ${(props) => (props.selected ? '#232129' : '#f4ede8')};
  font-family: 500;
  font-size: 22px;

  margin-left: 26px;
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

export const ContentCharts = styled.div`
  max-width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
`;
