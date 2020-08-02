import styled from 'styled-components';
import { shade } from 'polished';

interface DataProps {
  selected?: boolean;
}

export const Container = styled.div``;

export const Content = styled.main`
  max-width: 950px;
  height: 300px;
  display: flex;
`;

export const Schedule = styled.div`
  flex: 1;
  margin-right: 120px;
  text-align: center;

  h1 {
    font-size: 36px;
  }

  h2 {
    font-size: 18px;
    color: #999591;
    font-weight: 400;
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
