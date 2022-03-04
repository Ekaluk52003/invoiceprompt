import React, {useContext} from "react";
import  useUser  from "./User";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Menus from "./Menus";
import { useTheme } from '@mui/material/styles';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import {ThemeContext }from "../../src/themes/CustomThemeProvider"

const drawerWidth = 200;

export default function Layout({ children, ...pageProps }) {
  const user = useUser();
  const theme = useTheme();
  const colorMode = React.useContext(ThemeContext);

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };



  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {user && <>
      <AppBar
        position='fixed'
        elevation={0}
        sx={{
          ml: { sm: `${drawerWidth}px` },
          zIndex: {
            sm: 1301,
          },
        }}
      >
        <Toolbar
          sx={{
            backgroundSize: "1rem 0.1rem",
            backgroundImage:
              "linear-gradient(to right, #9D9FB1 13%, rgba(255, 255, 255, 0) 0%)",
            backgroundRepeat: "repeat-x",
            backgroundPosition: "bottom",
          }}
        >
          <IconButton

            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>

            <Typography variant='body1' sx={{
              color:"primary.main",
              width:"100%",
              fontWeight:"bold"
            }} >
             <CreditScoreIcon/> Prompt Invoice
            </Typography>
            <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width:"100%"
            }}
          >
            <Box  sx={{
              display: "flex",
              justifyContent: "end",
              alignItems:"center",
              width:"100%"
            }}>

            <IconButton  onClick={colorMode.toggleColorMode} color="inherit">
        {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon sx={{color:"primary.main"}}/>}
      </IconButton>

            {user?.name && (
              <Avatar sx={{ bgcolor: "primary.main", width: 30, height: 30 }}>
               <Typography sx={{ color:"common.white"}}> {user?.name.substring(0, 2)} </Typography>
              </Avatar>
            )}
              </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component='nav'
        sx={{
          width: { sm: drawerWidth },
          flexShrink: { sm: 0 },
        }}
        aria-label='mailbox folders'
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          variant='temporary'
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },

            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >

          <Menus />

        </Drawer>
        <Drawer
          variant='permanent'
          sx={{
            display: { xs: "none", sm: "block" },

            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          <Menus />
        </Drawer>
      </Box> </>}
      <Box
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />

        {children}
      </Box>

    </Box>
  );
}
