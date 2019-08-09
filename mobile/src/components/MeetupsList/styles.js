import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { placeholderTextColor } from '~/styles/colors';

export const Container = styled.View`
  flex: 1;
  align-self: stretch;
  align-items: center;
  justify-content: center;
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { paddingLeft: 30, paddingRight: 30, paddingTop: 16 },
})`
  flex: 1;
  align-self: stretch;
`;

export const UnavailableIcon = styled(Icon).attrs({
  name: 'event-busy',
  size: 80,
  color: placeholderTextColor,
})`
  margin-top: 80px;
`;

export const UnavailableText = styled.Text`
  color: ${placeholderTextColor};
  text-align: center;
  font-weight: bold;
  font-size: 24px;
  margin: 30px 0;
`;
