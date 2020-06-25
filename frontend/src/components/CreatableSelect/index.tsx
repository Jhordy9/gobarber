import React, { useRef, useState, useCallback, useEffect } from 'react';
import { OptionTypeBase } from 'react-select';
import ReactSelect, { Props as CreatableProps } from 'react-select/creatable';
import { IconBaseProps } from 'react-icons/lib';
import { useField } from '@unform/core';

import { Container } from './style';

interface SelectProps extends CreatableProps<OptionTypeBase> {
  name: string;
  containerStyle?: object;
  icon?: React.ComponentType<IconBaseProps>;
}

const Select: React.FC<SelectProps> = ({
  name,
  containerStyle = {},
  icon: Icon,
  ...rest
}) => {
  const selectRef = useRef<any>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const { fieldName, registerField } = useField(name);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    try {
      setIsFilled(!!selectRef.current?.state.value.value);
    } catch {
      setIsFilled(false);
    }
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      getValue: (ref: any) => {
        if (rest.isMulti) {
          if (!ref.state.value) {
            return [];
          }
          return ref.state.value.map((option: OptionTypeBase) => option.value);
        }
        if (!ref.state.value) {
          return '';
        }
        return ref.state.value.value;
      },
    });
  }, [fieldName, registerField, rest.isMulti]);

  return (
    <Container style={containerStyle} isFilled={isFilled} isFocused={isFocused}>
      {Icon && <Icon size={20} />}

      <ReactSelect
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        classNamePrefix="react-select"
        isSearchable={false}
        ref={selectRef}
        theme={(theme) => ({
          ...theme,
          borderRadius: 4,
          colors: {
            ...theme.colors,
            primary25: 'neutral10',
            primary: 'neutral10',
          },
        })}
        {...rest}
      />
    </Container>
  );
};

export default Select;
