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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref.current, fieldName]);

  function handleChange(date) {
    setSelected(date);
  }

  return (
    <>
      <Picker
        selected={selected}
        onChange={handleChange}
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
