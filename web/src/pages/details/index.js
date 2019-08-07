import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import history from '~/services/history';
import { cancelMeetupRequest } from '~/store/modules/organizing/actions';

import { Container, Button } from './styles';

export default function Details({ match }) {
  const dispatch = useDispatch();

  const meetup = useSelector(
    state =>
      state.organizing.meetups.filter(m => m.id === Number(match.params.id))[0]
  );

  const dateFormatted = useMemo(
    () =>
      meetup &&
      format(parseISO(meetup.date), "dd 'de ' MMMM', às 'HH'h'", {
        locale: pt,
      }),
    [meetup]
  );

  function handleCancel() {
    dispatch(cancelMeetupRequest(meetup.id));
  }

  return (
    <Container>
      {meetup ? (
        <>
          <header>
            <h1>{meetup.title}</h1>

            <div>
              <Button
                primary
                onClick={() => history.push(`/meetup/${meetup.id}/edit`)}
              >
                Editar
              </Button>
              <Button onClick={handleCancel}>Cancelar</Button>
            </div>
          </header>

          <img src={meetup.file.url} alt={meetup.file.id} />

          <p>{meetup.description}</p>
          <aside>
            <time>{dateFormatted}</time>
            <address>{meetup.location}</address>
          </aside>
        </>
      ) : (
        <div>
          <h1>Esse Meetup não existe...</h1>
          <Button goBack onClick={() => history.push('/dashboard')}>
            Voltar para o dashboard
          </Button>
        </div>
      )}
    </Container>
  );
}

Details.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
