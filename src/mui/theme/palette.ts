import { ThemeOptions } from '@mui/material';
import colors from './foundations/colors';

export const palette: ThemeOptions['palette'] = {
  primary: {
    main: colors.brandColors.blueberry,
    light: colors.brandColors.blueberryLight,
    dark: colors.brandColors.blueberryDark,
  },
  secondary: {
    main: colors.brandColors.caribbeanGreen,
    light: colors.brandColors.caribbeanGreenLight,
  },
  grey: {
    50: colors.brandColors.ghostWhite,
    100: colors.brandColors.antiFlashWithe,
    400: colors.brandColors.silverSand,
    500: colors.brandColors.mediumGrey,
    700: colors.brandColors.spanishGray,
  },
  background: {
    default: colors.gray[50],
    paper: colors.white,
  },
};
