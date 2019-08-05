import React, { useMemo } from 'react';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import PropTypes from 'prop-types';

import { Container, Image, Title, P, SubmitButton } from './styles';

export default function Meetup({ data }) {
  const { File = {}, title, date, location, User } = data;

  const dateFormatted = useMemo(
    () => format(parseISO(date), "dd 'de' MMMM', às' HH'h'", { locale: pt }),
    [date]
  );

  function handleSubscription() {}

  return (
    <Container>
      <Image
        source={{
          uri: File.url || 'https://api.adorable.io/avatars/300/aaaaaaaa.png',
        }}
      />
      <Title>{title}</Title>
      <P>{dateFormatted}</P>
      <P>{location}</P>
      <P>Orgamizador: {User.name}</P>

      <SubmitButton onPress={handleSubscription}>
        Realizar inscrição
      </SubmitButton>
    </Container>
  );
}

Meetup.propTypes = {
  data: PropTypes.shape({
    date: PropTypes.string,
    title: PropTypes.string,
    location: PropTypes.string,
    User: PropTypes.objectOf(PropTypes.string),
    File: PropTypes.objectOf(PropTypes.string),
  }).isRequired,
};
