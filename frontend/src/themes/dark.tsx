import { createTheme } from '@mui/material/styles'
import { grey } from '@mui/material/colors';
export const darkTheme = createTheme({
  typography: {
    fontFamily: 'Inter',

    h4: {
      fontWeight:"bold",
      fontSize:"15px",
    },

  },
  palette: {
    mode: "dark",
    primary: {
      main: '#007efe',
    },

          background: {
            default: "#0a1929",
            paper: "#041d38"
          },
          text: {
            primary: '#fff',
            secondary: grey[500],
          },
  }
});