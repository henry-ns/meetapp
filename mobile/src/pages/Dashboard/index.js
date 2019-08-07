import React, { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';

import { format, subDays, addDays } from 'date-fns';
import pt from 'date-fns/locale/pt';

import api from '~/services/api';

import Background from '~/components/Background';
import NavigationOptions from '~/components/NavigationOptions';
import Meetup from '~/components/Meetup';

import {
  Container,
  List,
  Time,
  DateButton,
  DateText,
  Load,
  AvailableContainer,
  AvailableIcon,
  AvailableText,
} from './styles';

function renderList(meetups, navigation) {
  return meetups.length > 0 ? (
    <List
      data={meetups}
      keyExtractor={item => String(item.id)}
      renderItem={({ item }) => <Meetup data={item} navigation={navigation} />}
    />
  ) : (
    <AvailableContainer>
      <AvailableIcon />
      <AvailableText>Nenhum meetup disponivel</AvailableText>
    </AvailableContainer>
  );
}

export default function Dashboard({ navigation }) {
  const [meetups, setMeetups] = useState([]);
  const [date, setDate] = useState(new Date());
  const [loading, setLoading] = useState(false);

  const dateFormatted = useMemo(
    () => format(date, "dd 'de' MMMM", { locale: pt }),
    [date]
  );

  useEffect(() => {
    async function loadMeetups() {
      setLoading(true);

      const res = await api.get('meetups', {
        params: { date },
      });

      setMeetups(res.data);
      setLoading(false);
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

        {loading ? <Load /> : renderList(meetups, navigation)}
      </Container>
    </Background>
  );
}

Dashboard.navigationOptions = NavigationOptions('Meetups', 'event');

Dashboard.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
