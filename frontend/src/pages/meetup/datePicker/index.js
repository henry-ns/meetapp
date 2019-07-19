import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { useField } from '@rocketseat/unform';

import { Picker } from './styles';

export default function DatePicker({ name }) {
  const { fieldName, registerField, defaultValue, error } = useField(name);
  const [selected, setSelected] = useState(defaultValue);

  const ref = useRef();

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'props.selected',
      clearValue: pickerRef => {
        pickerRef.clear();
      },
    });
  }, [fieldName, registerField, ref]);

  return (
    <>
      <Picker
        name={fieldName}
        selected={selected}
        onChange={date => setSelected(date)}
        ref={ref}
        timeIntervals={60}
        showTimeSelect
        timeFormat="HH:mm"
        dateFormat="d 'de' MMMM',' yyyy', às' h:mm aa"
        timeCaption="time"
        placeholderText="Quando vai ser?"
      />
      {error && <span>{error}</span>}
    </>
  );
}

DatePicker.propTypes = {
  name: PropTypes.string.isRequired,
};
