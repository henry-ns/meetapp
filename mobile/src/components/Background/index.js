import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components/native';

import { primaryLightColor, primaryDarkColor } from '~/styles/colors';

export default styled(LinearGradient).attrs({
  colors: [primaryDarkColor, primaryLightColor],
})`
  flex: 1;
`;
