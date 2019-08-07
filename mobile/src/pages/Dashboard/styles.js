import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  primaryTextColor,
  primaryColor,
  placeholderTextColor,
} from '~/styles/colors';

import Button from '~/components/Button';

export const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
`;

export const Time = styled.View`
  flex-direction: row;
  align-items: center;

  margin: 30px 0 16px;
`;

export const DateButton = styled(Button)`
  width: 40px;
  height: 40px;

  margin: 0 20px;
`;

export const DateText = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${primaryTextColor};
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { paddingLeft: 30, paddingRight: 30, paddingTop: 16 },
})`
  flex: 1;
  align-self: stretch;
`;

export const Load = styled.ActivityIndicator.attrs({
  size: 50,
  color: primaryColor,
})`
  flex: 1;
  align-items: center;
  justify-content: center;
  margin-bottom: 50px;
`;

export const AvailableContainer = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const AvailableIcon = styled(Icon).attrs({
  name: 'event-busy',
  size: 80,
  color: placeholderTextColor,
})``;

export const AvailableText = styled.Text`
  color: ${placeholderTextColor};
  font-weight: bold;
  font-size: 24px;
  margin: 30px 0;
`;
