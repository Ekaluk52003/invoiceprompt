import React, { useState } from 'react';
import { ThemeProvider } from "@mui/material/styles";
import { getThemeByName } from './base';


export const ThemeContext = React.createContext({ toggleColorMode: () => {} });


const CustomThemeProvider: React.FC = ({children}) => {

    const currentTheme = localStorage.getItem('appTheme') || 'lightTheme'
    // State to hold the selected theme name
    const [themeName, _setThemeName] = useState(currentTheme);
    const colorMode = React.useMemo(
        () => ({
          toggleColorMode: () => {
            _setThemeName((prevMode) => (prevMode === 'lightTheme' ? 'darkTheme' : 'lightTheme'));
            localStorage.setItem("appTheme", themeName === 'lightTheme' ? 'darkTheme' : 'lightTheme');
          },
        }),
        [themeName],
        );

    // Retrieve the theme object by theme name
    const theme = getThemeByName(themeName);

    return (
        <ThemeContext.Provider value={colorMode}>
        < ThemeProvider  theme={theme}>{children}</ ThemeProvider >
        </ThemeContext.Provider>
    );
}

export default CustomThemeProvider;