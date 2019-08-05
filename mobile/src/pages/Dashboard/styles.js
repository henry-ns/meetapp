import styled from 'styled-components/native';
import { primaryTextColor } from '~/styles/colors';

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
  contentContainerStyle: { padding: 16, paddingBottom: 0 },
})`
  flex: 1;
  align-self: stretch;
`;
