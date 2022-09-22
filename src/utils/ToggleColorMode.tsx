import { ThemeProvider, createTheme, PaletteMode } from "@mui/material";
import { createContext, useMemo, useState } from "react";

interface IToggleColorModeProps {
  children: React.ReactNode;
}

export const ColorModeContext = createContext({
  mode: "light",
  setMode: (mode: PaletteMode) => {},
  toggleColorMode: () => {},
});

const ToggleColorMode = ({ children }: IToggleColorModeProps) => {
  const [mode, setMode] = useState<PaletteMode>("light");

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={{ mode, toggleColorMode, setMode }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default ToggleColorMode;
