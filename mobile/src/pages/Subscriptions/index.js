import React, { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';

import { subDays, addDays } from 'date-fns';
import api from '~/services/api';

import Background from '~/components/Background';
import MeetupsList from '~/components/MeetupsList';
import NavigationOptions from '~/components/NavigationOptions';

import { Container, Load } from './styles';

export default function Subscriptions({ navigation }) {
  const [meetups, setMeetups] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  async function loadMeetups(value = 1) {
    const res = await api.get('subscriptions', {
      params: { page: value },
    });

    if (res.data.length > 0 || value === 1) {
      setPage(value + 1);
      const list = res.data.map(item => ({ ...item.Meetup }));
      setMeetups(value === 1 ? list : [...meetups, ...list]);
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
  }, []);

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
        {loading ? (
          <Load />
        ) : (
          <MeetupsList
            navigation={navigation}
            message={'Você não tem meetup \n inscritos'}
            data={meetups}
            refreshing={refreshing}
            onRefresh={handleRefresh}
            onEndReachedThreshold={0.2}
            onEndReached={loadMore}
          />
        )}
      </Container>
    </Background>
  );
}

Subscriptions.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

Subscriptions.navigationOptions = NavigationOptions(
  'Inscrições',
  'event-available'
);
