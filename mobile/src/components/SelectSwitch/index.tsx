import React, { useRef, useEffect } from 'react';

import SwitchSelector from 'react-native-switch-selector';

import { useField } from '@unform/core';

interface OptionsProps {
  label: string;
  value: string;
}

interface SelectProps {
  name: string;
  options: OptionsProps[];
  propsStyles?: {};
}

const SelectSwitch: React.RefForwardingComponent<SelectProps, any> = ({
  name,
  options,
  propsStyles = {},
  ...rest
}) => {
  const { fieldName, registerField, defaultValue } = useField(name);

  const selectRef = useRef<any>({ value: defaultValue });

  const optionsStyle = {
    gray: '#232129',
    orange: '#ff9000',
    naturalWhite: '#fff',
    fontColor: '#666360',
  };

  useEffect(() => {
    if (selectRef.current) {
      selectRef.current.value = defaultValue;
    }
  }, [defaultValue]);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      clearValue(ref) {
        // eslint-disable-next-line no-param-reassign
        ref.value = '';
        ref.clear();
      },
      setValue(ref, value) {
        ref.setNativeProps({ text: value });
        selectRef.current.value = value;
      },
      getValue(ref) {
        return ref.value;
      },
    });
  }, [fieldName, registerField]);

  return (
    <SwitchSelector
      ref={selectRef}
      style={propsStyles}
      borderRadius={10}
      buttonColor={optionsStyle.orange}
      textColor={optionsStyle.fontColor}
      buttonMargin={8}
      backgroundColor={optionsStyle.gray}
      height={48}
      fontSize={16}
      onPress={(value) => {
        if (selectRef.current) {
          selectRef.current.value = value;
        }
      }}
      options={options}
      {...rest}
    />
  );
};

export default SelectSwitch;
