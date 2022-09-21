import { createTheme } from '@mui/material/styles';
import { palette } from './palette';

export const theme = createTheme({
  spacing: (factor: number) => `${0.25 * factor}rem`,
  palette,
});
