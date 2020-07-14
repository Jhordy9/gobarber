import React, { useRef, useState, useCallback, useEffect } from 'react';
import { OptionTypeBase } from 'react-select';
import ReactSelect, { Props as CreatableProps } from 'react-select/creatable';
import { IconBaseProps } from 'react-icons/lib';
import { useField } from '@unform/core';

import { FiAlertCircle } from 'react-icons/fi';
import { Container, Error } from './style';

interface SelectProps extends CreatableProps<OptionTypeBase> {
  name: string;
  containerStyle?: object;
  icon?: React.ComponentType<IconBaseProps>;
  options?: OptionsData[];
}

interface OptionsData {
  label: string;
  value: string;
}

const Select: React.FC<SelectProps> = ({
  name,
  containerStyle = {},
  icon: Icon,
  options = [],
  ...rest
}) => {
  const selectRef = useRef<any>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const { fieldName, error, registerField, defaultValue } = useField(name);

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
      setValue: (ref, value) => {
        ref.select.select.setValue(value);
      },
      clearValue: (ref) => {
        ref.select.clearValue();
      },
    });
  }, [fieldName, registerField, rest.isMulti]);

  return (
    <Container
      style={containerStyle}
      isFilled={isFilled}
      isFocused={isFocused}
      isErrored={!!error}
    >
      {Icon && <Icon size={20} />}

      <ReactSelect
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        defaultValue={
          defaultValue &&
          options.find((option) => option.value === defaultValue)
        }
        classNamePrefix="react-select"
        ref={selectRef}
        options={options}
        isSearchable={false}
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
      {error && (
        <Error title={error}>
          <FiAlertCircle color="#c53030" size={20} />
        </Error>
      )}
    </Container>
  );
};

export default Select;
