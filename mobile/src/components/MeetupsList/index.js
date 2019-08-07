import React from 'react';
import PropTypes from 'prop-types';

import {
  FlingGestureHandler,
  Directions,
  State,
} from 'react-native-gesture-handler';

import Meetup from '~/components/Meetup';

import {
  Container,
  AvailableIcon,
  AvailableText,
  ContainerList,
} from './styles';

let initialX = 0;

export default function MeetupsList({ data, navigation, onGesture, ...rest }) {
  return (
    <FlingGestureHandler
      direction={Directions.LEFT + Directions.RIGHT}
      onHandlerStateChange={({ nativeEvent }) => {
        const { state, absoluteX } = nativeEvent;

        if (state === State.BEGAN) {
          initialX = absoluteX;
        } else if (state === State.END) {
          onGesture(initialX, absoluteX);

          initialX = 0;
        }
      }}
    >
      <Container>
        {data.length > 0 ? (
          <ContainerList
            {...rest}
            data={data}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => (
              <Meetup data={item} navigation={navigation} />
            )}
          />
        ) : (
          <>
            <AvailableIcon />
            <AvailableText>
              Nenhum meetup disponivel{'\n'}nesse dia
            </AvailableText>
          </>
        )}
      </Container>
    </FlingGestureHandler>
  );
}

MeetupsList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape()),
  onGesture: PropTypes.func,
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

MeetupsList.defaultProps = {
  onGesture: () => {},
  data: [],
};
