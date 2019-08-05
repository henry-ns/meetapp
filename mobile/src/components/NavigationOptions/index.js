import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

function NavigationOptions(label, icon) {
  function tabBarIcon({ tintColor }) {
    return <Icon name={icon} size={20} color={tintColor} />;
  }

  tabBarIcon.propTypes = {
    tintColor: PropTypes.string.isRequired,
  };

  return {
    tabBarLabel: label,
    tabBarIcon,
  };
}

export default NavigationOptions;
