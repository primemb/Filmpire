import React, { useState } from "react";
import {
  TextField,
  InputAdornment,
  Box,
  styled,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { useAppDispatch } from "../../app/hooks";
import { searchMovie } from "../../features/currentGenreOrCategory";
import { useLocation } from "react-router-dom";

const SearchContainer = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },
}));

const Search = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useAppDispatch();
  const [query, setquery] = useState("");
  const location = useLocation();

  if (location.pathname !== "/") return null;

  const handelOnChange = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      dispatch(searchMovie(query));
    }
  };

  return (
    <SearchContainer sx={{}}>
      <TextField
        value={query}
        onKeyPress={handelOnChange}
        onChange={(e) => setquery(e.target.value)}
        variant="standard"
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          sx: {
            color: theme.palette.mode === "light" ? "black" : "white",
            filter: theme.palette.mode === "light" ? "invert(1)" : "white",
            marginTop: isMobile ? "-30px" : "0px",
            marginBottom: isMobile ? "-10px" : "0px",
            maxWidth: isMobile ? "100%" : "100%",
          },
        }}
      />
    </SearchContainer>
  );
};

export default Search;
