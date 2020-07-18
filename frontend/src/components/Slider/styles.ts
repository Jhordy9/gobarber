import styled from 'styled-components';

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

export const Provider = styled.div`
  background: #3e3b47;
  padding: 16px 24px;
  border-radius: 10px;
  border: 1px solid #ff9000;

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
`;
