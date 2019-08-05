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
  margin: 20px 0 30px;
  opacity: 0.4;
  background: ${placeholderTextColor};
`;

export const Form = styled.ScrollView.attrs({
  contentContainerStyle: { padding: 16 },
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
  margin-top: 15px;
  height: 42px;
  background: ${secondaryButton};
`;
