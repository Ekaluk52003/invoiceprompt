import { createTheme } from "@mui/material/styles";
import { amber, deepOrange, grey, red, blue } from "@mui/material/colors";

// Create a theme instance.
export const lightTheme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {},
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          background: "#EFF5F8",
          color: "primary.main",
        },
      },
    },

    MuiDrawer: {
      styleOverrides: {
        paper: {
          background: "#EFF5F8",
          color: "primary.main",
          border: "none",
          backgroundSize: "0.1rem 0.8rem",
          backgroundImage:
            "linear-gradient(to top, #9D9FB1 13%, rgba(255, 255, 255, 0) 0%)",
          backgroundRepeat: "repeat-y",
          backgroundPosition: "right",
        },
      },
    },
  },
  typography: {
    fontFamily: "Inter",
    body1: {
      color: "#28234a",
    },
    h1: {
      color: "#056dff",
      fontWeight: "bold",
    },

    h4: {
      color: "#28234A",
      fontWeight: "bold",
      fontSize: "15px",
    },
  },

  palette: {
    background: {
      default: "#EFF5F8",
    },
    primary: {
      main: "#0C70F2",
    },
    secondary: {
      main: "#1F1E40",
    },
    text: {
      primary: "#28234A",
      secondary: "#78778f",
    },

    error: {
      main: red.A400,
    },
  },
});

// lightTheme.components?.MuiButton = {

// styleOverrides:{
//   root:{
//     borderRadius: 4, // square corners
//     textTransform: 'none', // removes uppercase transformation
//     boxShadow:"none",
//     fontWeight: 700, // makes text bold
//   },
// }
// };

// lightTheme.components?.MuiTypography = {
//   styleOverrides:{
//     h4:{
//       [lightTheme.breakpoints.up('md')]: {
//         fontSize:"25px",
//       },
//     }

//     },
// };
