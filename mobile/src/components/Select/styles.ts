import styled, { css } from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/Feather';

import RNPickerSelect from 'react-native-picker-select';

interface ContainerProps {
  isFocused: boolean;
  isErrored: boolean;
}

export const ContainerSelect = styled(RNPickerSelect)`
  border: 3px solid #000;
`;

export const Container = styled.Picker``;

export const Icon = styled(FeatherIcon)`
  margin-right: 16px;
`;
