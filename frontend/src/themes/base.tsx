
import { lightTheme } from "./light";
import { darkTheme } from "./dark";

export function getThemeByName(theme: string) {
  return themeMap[theme];
}
//@ts-ignore
const themeMap: { [key: string]} = {
  lightTheme,
  darkTheme
};