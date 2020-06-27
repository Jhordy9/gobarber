import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip/index';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: #232129;
  border-radius: 10px;
  padding: 16px;
  width: 100%;
  height: 60px;

  border: 2px solid #232129;
  color: #666360;

  display: flex;
  align-items: center;

  font-size: 16px;

  & + div {
    margin-top: 8px;
  }

  ${(props) =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}

  ${(props) =>
    props.isFocused &&
    css`
      border-color: #ff9000;
      color: #f4ede8;

      svg {
        color: #ff9000;
      }
    `}

  ${(props) =>
    props.isFilled &&
    css`
      color: #ff9000;
    `}

    svg {
    margin-right: 4px;
  }

  .css-2b097c-container {
    flex: 1;
    background: transparent;
    color: #f4ede8;

    .react-select__placeholder {
      color: #666360;
    }

    .react-select__control {
      background: #232129;
      border: none;
    }

    .react-select__menu {
      width: 340px;
      background: #232129;
      border: 1px solid #ff9000;
      border-radius: 10px;
      left: -42px;
    }

    .react-select__option {
      & + div {
        border-top: 1px solid #ff9000;
      }
    }

    .react-select__single-value {
      color: #f4ede8;
    }

    .react-select__indicator-separator {
      display: none;
    }

    .react-select__indicators {
      svg {
        color: #666360;
      }
    }
  }

`;

export const Error = styled(Tooltip)`
  height: 20px;

  svg {
    margin: 0;
  }

  span {
    background: #c53030;
    color: #fff;

    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
