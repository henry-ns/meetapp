import React, { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';

import { format, subDays, addDays } from 'date-fns';
import pt from 'date-fns/locale/pt';

import api from '~/services/api';

import Background from '~/components/Background';
import MeetupsList from '~/components/MeetupsList';
import NavigationOptions from '~/components/NavigationOptions';

import { Container, Time, DateButton, DateText, Load } from './styles';

export default function Dashboard({ navigation }) {
  const [meetups, setMeetups] = useState([]);
  const [date, setDate] = useState(addDays(new Date(), 0));
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const dateFormatted = useMemo(
    () => format(date, "dd 'de' MMMM", { locale: pt }),
    [date]
  );

  async function loadMeetups(value = 1) {
    const res = await api.get('meetups', {
      params: { date, page: value },
    });

    if (res.data.length > 0 || value === 1) {
      setPage(value + 1);
      setMeetups(value === 1 ? res.data : [...meetups, ...res.data]);
    }
  }

  useEffect(() => {
    async function load() {
      setLoading(true);
      await loadMeetups();
      setLoading(false);
    }

    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  function handlePrevDay() {
    setPage(1);
    setDate(subDays(date, 1));
  }

  function handleNextDay() {
    setPage(1);
    setDate(addDays(date, 1));
  }

  async function handleRefresh() {
    setRefreshing(true);
    await loadMeetups();
    setRefreshing(false);
  }

  function loadMore() {
    loadMeetups(page);
  }

  return (
    <Background>
      <Container>
        <Time>
          <DateButton icon="chevron-left" onPress={handlePrevDay} />
          <DateText>{dateFormatted}</DateText>
          <DateButton icon="chevron-right" onPress={handleNextDay} />
        </Time>
        {loading ? (
          <Load />
        ) : (
          <MeetupsList
            navigation={navigation}
            data={meetups}
            refreshing={refreshing}
            onRefresh={handleRefresh}
            onEndReachedThreshold={0.2}
            onEndReached={loadMore}
            onGesture={(initialX, absoluteX) => {
              if (absoluteX - initialX < 0) handleNextDay();
              else handlePrevDay();
            }}
          />
        )}
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
