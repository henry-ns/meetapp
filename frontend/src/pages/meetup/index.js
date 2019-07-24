import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { parseISO } from 'date-fns';
import * as Yup from 'yup';

import FileInput from './fileInput';
import DatePicker from './datePicker';

import {
  createMeetupRequest,
  updateMeetupRequest,
} from '~/store/modules/organizing/actions';

import { Container, Input } from './styles';

const schema = Yup.object().shape({
  title: Yup.string().required('O título é obrigatório'),
  description: Yup.string()
    .max(255, 'No maxímo 255 caracteres')
    .required('A descrição é obrigatória'),
  date: Yup.date().required('A data é obrigatória'),
  location: Yup.string().required('O endereço é obrigatório'),
  file_id: Yup.number(),
});

export default function Meetup({ match }) {
  const dispatch = useDispatch();
  const { id } = match.params;

  const meetup = useSelector(state => {
    const meet = state.organizing.meetups.filter(m => m.id === Number(id));

    if (meet.length <= 0) return {};

    return {
      ...meet[0],
      date: parseISO(meet[0].date),
    };
  });

  function handleSubmit(data) {
    dispatch(
      meetup.id
        ? updateMeetupRequest({ data, id: meetup.id })
        : createMeetupRequest(data)
    );
  }

  return (
    <Container initialData={meetup} schema={schema} onSubmit={handleSubmit}>
      <FileInput name="file_id" />

      <Input name="title" placeholder="Título do Meetup" />
      <Input name="description" placeholder="Descrição completa" multiline />

      <DatePicker name="date" />

      <Input name="location" placeholder="Localização" />

      <button type="submit">Salvar</button>
    </Container>
  );
}

Meetup.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
