import styled from 'styled-components/native';

import Button from '~/components/Button';
import Input from '~/components/Input';

import {
  placeholderTextColor,
  primaryButton,
  secondaryButton,
} from '~/styles/colors';

export const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
`;

export const Divider = styled.View`
  height: 1px;
  opacity: 0.4;
  background: ${placeholderTextColor};
  margin: ${({ marginStyle }) => marginStyle || '15px 0 25px'};
`;

export const Form = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { padding: 30 },
})`
  align-self: stretch;
`;

export const FormInput = styled(Input)`
  margin-bottom: 10px;
`;

export const SubmitButton = styled(Button)`
  margin-top: 5px;
  background: ${primaryButton};
`;

export const LogoutButton = styled(Button)`
  height: 42px;
  background: ${secondaryButton};
`;
