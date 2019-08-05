import React, { useEffect, useState, useMemo } from 'react';
import { format, subDays, addDays } from 'date-fns';
import pt from 'date-fns/locale/pt';

import api from '~/services/api';

import Background from '~/components/Background';
import NavigationOptions from '~/components/NavigationOptions';
import Meetup from '~/components/Meetup';

import { Container, List, Time, DateButton, DateText } from './styles';

export default function Dashboard() {
  const [meetups, setMeetups] = useState([]);
  const [date, setDate] = useState(new Date());

  const dateFormatted = useMemo(
    () => format(date, "dd 'de' MMMM", { locale: pt }),
    [date]
  );

  useEffect(() => {
    async function loadMeetups() {
      const res = await api.get('meetups', {
        params: { date },
      });
      setMeetups(res.data);
    }

    loadMeetups();
  }, [date]);

  function handlePrevDay() {
    setDate(subDays(date, 1));
  }

  function handleNextDay() {
    setDate(addDays(date, 1));
  }

  return (
    <Background>
      <Container>
        <Time>
          <DateButton icon="chevron-left" onPress={handlePrevDay} />
          <DateText>{dateFormatted}</DateText>
          <DateButton icon="chevron-right" onPress={handleNextDay} />
        </Time>

        <List
          data={meetups}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => <Meetup data={item} />}
        />
      </Container>
    </Background>
  );
}

Dashboard.navigationOptions = NavigationOptions('Meetups', 'event');
