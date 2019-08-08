import React from 'react';
import PropTypes from 'prop-types';

import Meetup from '~/components/Meetup';

import { Container, UnavailableIcon, UnavailableText, List } from './styles';

export default function MeetupsList({
  data,
  navigation,
  subscription,
  unavailableMsg,
  ...rest
}) {
  return (
    <Container>
      {data.length > 0 ? (
        <List
          {...rest}
          data={data}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <Meetup
              data={item}
              navigation={navigation}
              subscription={subscription}
            />
          )}
        />
      ) : (
        <>
          <UnavailableIcon />
          <UnavailableText>{unavailableMsg}</UnavailableText>
        </>
      )}
    </Container>
  );
}

MeetupsList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape()),
  unavailableMsg: PropTypes.string,
  subscription: PropTypes.bool,
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

MeetupsList.defaultProps = {
  data: [],
  unavailableMsg: 'Nenhum meetup disponivel \n nesse dia',
  subscription: false,
};
