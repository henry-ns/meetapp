import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import history from '~/services/history';
import { getMeetupsRequest } from '~/store/modules/organizing/actions';

import { Container } from './styles';

export default function Dashboard() {
  const meetups = useSelector(state => state.organizing.meetups);
  const dispatch = useDispatch();

  const dateFormatted = useMemo(
    () =>
      meetups.map(meetup =>
        format(parseISO(meetup.date), "dd 'de ' MMMM', às 'HH'h'", {
          locale: pt,
        })
      ),
    [meetups]
  );

  useEffect(() => {
    dispatch(getMeetupsRequest());
  }, [dispatch]);

  return (
    <Container>
      <div>
        <h1>Meus meetups</h1>
        <button type="button" onClick={() => history.push('/meetup/new')}>
          Novo meetup
        </button>
      </div>
      <ul>
        {meetups.map((meetup, index) => (
          <li key={meetup.id}>
            <Link to={`/details/${meetup.id}`}>
              <p>{meetup.title}</p>
              <time>{dateFormatted[index]}</time>
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  );
}
