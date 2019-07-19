import React from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

import FileInput from './fileInput';
import DatePicker from './datePicker';

import { createMeetupRequest } from '~/store/modules/meetup/actions';

import { Container, Input } from './styles';

const schema = Yup.object().shape({
  title: Yup.string().required('O título é obrigatório'),
  description: Yup.string()
    .max(255, 'No maxímo 255 caracteres')
    .required('A descrição é obrigatória'),
  date: Yup.date().required('A data é obrigatória'),
  location: Yup.string().required('O endereço é obrigatório'),
});

export default function Meetup() {
  const dispatch = useDispatch();

  function handleSubmit(data) {
    dispatch(createMeetupRequest(data));
  }

  return (
    <Container schema={schema} onSubmit={handleSubmit}>
      <FileInput name="file_id" />

      <Input name="title" placeholder="Título do Meetup" />
      <Input name="description" placeholder="Descrição completa" multiline />

      <DatePicker name="date" />

      <Input name="location" placeholder="Localização" />

      <button type="submit">Salvar meetup</button>
    </Container>
  );
}
