import styled from 'styled-components/native';

import { primaryTextColor, placeholderTextColor } from '~/styles/colors';

export const Container = styled.View`
  flex-direction: row;
  align-items: center;

  background: rgba(0, 0, 0, 0.2);
  height: 50px;
  padding: 0 15px;
  border-radius: 4px;
`;

export const TInput = styled.TextInput.attrs({
  placeholderTextColor,
})`
  flex: 1;
  font-size: 15px;
  margin-left: 15px;

  color: ${primaryTextColor};
`;
