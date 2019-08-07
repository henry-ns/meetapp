import React, { useMemo } from 'react';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import PropTypes from 'prop-types';

import api from '~/services/api';

import { Container, Image, Title, P, SubmitButton } from './styles';

export default function Meetup({ navigation, data }) {
  const { file = {}, title, date, location, owner, id } = data;

  const dateFormatted = useMemo(
    () => format(parseISO(date), "dd 'de' MMMM', às' HH'h'", { locale: pt }),
    [date]
  );

  async function handleSubscription() {
    await api.post(`meetups/${id}/subscribe`);

    navigation.navigate('Subscriptions');
  }

  return (
    <Container>
      <Image
        source={{
          uri: file.url || 'https://api.adorable.io/avatars/300/aaaaaaaa.png',
        }}
      />
      <Title>{title}</Title>
      <P>{dateFormatted}</P>
      <P>{location}</P>
      <P>Orgamizador: {owner.name}</P>

      <SubmitButton onPress={handleSubscription}>
        Realizar inscrição
      </SubmitButton>
    </Container>
  );
}

Meetup.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
  data: PropTypes.shape({
    id: PropTypes.number,
    date: PropTypes.string,
    title: PropTypes.string,
    location: PropTypes.string,
    owner: PropTypes.shape(),
    file: PropTypes.shape(),
  }).isRequired,
};
