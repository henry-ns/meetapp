import React from 'react';
import { ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container, Text } from './styles';
import { primaryTextColor } from '~/styles/colors';

export default function Button({ children, loading, icon, ...rest }) {
  return (
    <Container {...rest}>
      {loading ? (
        <ActivityIndicator size="small" color={primaryTextColor} />
      ) : (
        <>
          {icon && <Icon name={icon} size={35} color={primaryTextColor} />}
          {children && <Text>{children}</Text>}
        </>
      )}
    </Container>
  );
}

Button.propTypes = {
  children: PropTypes.string,
  loading: PropTypes.bool,
  icon: PropTypes.string,
};

Button.defaultProps = {
  children: null,
  loading: false,
  icon: null,
};
