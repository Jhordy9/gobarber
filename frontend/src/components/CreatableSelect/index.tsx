import React, { useRef, useState, useCallback, useEffect } from 'react';
import { OptionTypeBase } from 'react-select';
import ReactSelect, { Props as CreatableProps } from 'react-select/creatable';
import { IconBaseProps } from 'react-icons/lib';
import { useField } from '@unform/core';
import { Form } from '@unform/web';

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
  const selectRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const { fieldName, registerField } = useField(name);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFilled(true);

    setIsFilled(!!selectRef.current);
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

      <Form
        onSubmit={() => {
          /** */
        }}
        ref={selectRef}
      >
        <ReactSelect
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          classNamePrefix="react-select"
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
      </Form>
    </Container>
  );
};

export default Select;
