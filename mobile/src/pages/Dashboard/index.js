import React, { useEffect, useState, useMemo } from 'react';
import { Dimensions } from 'react-native';
import {
  FlingGestureHandler,
  Directions,
  State,
} from 'react-native-gesture-handler';
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

let initialX = 0;

function RenderList(meetups, navigation) {
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

        {loading ? (
          <Load />
        ) : (
          <FlingGestureHandler
            direction={Directions.LEFT + Directions.RIGHT}
            onHandlerStateChange={({ nativeEvent }) => {
              const { state, absoluteX } = nativeEvent;

              switch (state) {
                case State.BEGAN:
                  initialX = absoluteX;
                  break;
                case State.END:
                  if (absoluteX - initialX < 0) handleNextDay();
                  else handlePrevDay();

                  initialX = 0;
                  break;
                default:
              }
            }}
          >
            {RenderList(meetups, navigation)}
          </FlingGestureHandler>
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
