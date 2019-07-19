import styled from 'styled-components';
import ReactDatePicker from 'react-datepicker';
import { primaryTextColor } from '~/styles/colors';

export const Picker = styled(ReactDatePicker)`
  width: 100%;
  height: 42px;
  padding: 20px;
  font-size: 1.28em;

  background: rgba(0, 0, 0, 0.1);
  color: ${primaryTextColor};
`;
