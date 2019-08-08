import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { format, parseISO, isBefore } from 'date-fns';
import pt from 'date-fns/locale/pt';

import { subscriberRequest } from '~/store/modules/meetups/actions';
import { unsubscriberRequest } from '~/store/modules/subscriptions/actions';

import { Container, Image, Title, P, SubmitButton } from './styles';

export default function Meetup({ data, subscription }) {
  const { file = {}, title, date, location, owner, id, subscriber } = data;
  const dispatch = useDispatch();

  const past = useMemo(() => isBefore(parseISO(date), new Date()), [date]);

  const dateFormatted = useMemo(
    () => format(parseISO(date), "dd 'de' MMMM', às' HH'h'", { locale: pt }),
    [date]
  );

  const buttonText = useMemo(() => {
    if (subscription) return 'Cancelar inscrição';

    if (subscriber) return 'Inscrito';

    return past ? 'Indisponivel' : 'Realizar inscrição';
  }, [past, subscriber, subscription]);

  function handlePress() {
    dispatch(subscription ? unsubscriberRequest(id) : subscriberRequest(id));
  }

  return (
    <Container>
      <Image
        source={{
          uri: file.url || 'https://api.adorable.io/avatars/300/meetup.png',
        }}
      />

      <Title>{title}</Title>
      <P>{dateFormatted}</P>
      <P>{location}</P>
      <P>Orgamizador: {owner.name}</P>

      <SubmitButton
        past={past}
        onPress={handlePress}
        subscriber={subscriber}
        enabled={!past && !subscriber}
      >
        {buttonText}
      </SubmitButton>
    </Container>
  );
}

Meetup.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number,
    date: PropTypes.string,
    title: PropTypes.string,
    subscriber: PropTypes.bool,
    location: PropTypes.string,
    owner: PropTypes.shape(),
    file: PropTypes.shape(),
  }).isRequired,
  subscription: PropTypes.bool,
};

Meetup.defaultProps = {
  subscription: false,
};
