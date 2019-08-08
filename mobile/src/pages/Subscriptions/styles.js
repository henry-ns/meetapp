import styled from 'styled-components/native';
import { primaryColor } from '~/styles/colors';

export const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
`;

export const Load = styled.ActivityIndicator.attrs({
  size: 60,
  color: primaryColor,
})`
  flex: 1;
  align-items: center;
  justify-content: center;
  margin-bottom: 50px;
`;
