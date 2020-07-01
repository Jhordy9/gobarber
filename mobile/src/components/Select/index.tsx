import React, {
  useCallback,
  useRef,
  useEffect,
  useState,
  useImperativeHandle,
  forwardRef,
} from 'react';

import { useField } from '@unform/core';
import { Container, ContainerSelect } from './styles';

interface OptionsProps {
  label: string;
  value: string;
}

interface SelectValueReference {
  value: string;
}

interface SelectProps {
  name: string;
  options: OptionsProps[];
}

const Select: React.FC<SelectProps> = ({ name, options, ...rest }) => {
  const { fieldName, registerField, defaultValue, error } = useField(name);

  const selectRef = useRef<any>(null);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);

    setIsFilled(!!selectRef.current.value);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  useEffect(() => {
    if (selectRef.current) {
      selectRef.current.value = defaultValue;
    }
  }, [defaultValue]);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      clearValue(ref: any) {
        // eslint-disable-next-line no-param-reassign
        ref.value = '';
        ref.clear();
      },
      setValue(ref: any, value) {
        ref.setNativeProps({ text: value });
        selectRef.current.value = value;
      },
      getValue(ref: any) {
        return ref.value;
      },
    });
  }, [fieldName, registerField]);

  return (
    <ContainerSelect
      ref={selectRef}
      onValueChange={(value) => {
        if (selectRef.current) {
          selectRef.current.value = value;
        }
      }}
      items={options}
      {...rest}
    />
  );
};

export default Select;
