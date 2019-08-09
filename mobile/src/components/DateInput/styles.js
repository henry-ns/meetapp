import styled from 'styled-components/native';

import { primaryTextColor } from '~/styles/colors';

export const Container = styled.View`
`;

export const Picker = styled.View`
  background: ${primaryTextColor};
  padding: 15px 30px;
`;

export const DateButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;

  height: 46px;
  background: transparent;
`;

export const DateText = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${primaryTextColor};
`;
