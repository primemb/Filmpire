import {
  Box,
  CircularProgress,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  useTheme,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import { useGetGenresQuery } from "../../services/TMDB";
import genreIcons from "../../assets/genres/index";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectGenreOrCategory } from "../../features/currentGenreOrCategory";
import { useEffect } from "react";
interface ISidebarProps {
  setMobileOpen: (state: boolean) => void;
}

type IIcons = typeof genreIcons;
const Sidebar = ({ setMobileOpen }: ISidebarProps) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const { data, isFetching } = useGetGenresQuery();
  const { genreIdOrCategoryName } = useAppSelector(
    (state) => state.currentGenreOrCategory
  );
  const categories = [
    { label: "Popular", value: "popular" },
    { label: "Top Rated", value: "top_rated" },
    { label: "Upcoming", value: "upcoming" },
  ];

  useEffect(() => {
    setMobileOpen(false);
  }, [genreIdOrCategoryName, setMobileOpen]);

  const redLogo =
    "https://fontmeme.com/permalink/210930/8531c658a743debe1e1aa1a2fc82006e.png";
  const blueLogo =
    "https://fontmeme.com/permalink/210930/6854ae5c7f76597cf8680e48a2c8a50a.png";
  return (
    <>
      <Box
        component={NavLink}
        to="/"
        sx={{ display: "flex", justifyContent: "center", padding: "10% 0" }}
      >
        <Box
          component="img"
          sx={{ width: "70%" }}
          src={theme.palette.mode === "light" ? redLogo : blueLogo}
          alt="Filmpire logo"
        />
      </Box>
      <Divider />
      <List>
        <ListSubheader>Categories</ListSubheader>
        {categories.map(({ label, value }) => (
          <Box
            key={value}
            component={NavLink}
            to="/"
            sx={{
              color: (theme) => theme.palette.text.primary,
              textDecoration: "none",
            }}
          >
            <ListItemButton
              onClick={() => dispatch(selectGenreOrCategory(value))}
            >
              <ListItemIcon>
                <Box
                  component="img"
                  sx={{
                    filter: (theme) =>
                      theme.palette.mode === "dark" ? "invert(1)" : "dark",
                  }}
                  src={genreIcons[label.toLocaleLowerCase() as keyof IIcons]}
                  height="30px"
                />
              </ListItemIcon>
              <ListItemText primary={label} />
            </ListItemButton>
          </Box>
        ))}
      </List>
      <Divider />
      <List>
        <ListSubheader>Genres</ListSubheader>
        {isFetching ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        ) : (
          data?.genres.map(({ id, name }) => (
            <Box
              key={id}
              component={NavLink}
              to="/"
              sx={{
                color: (theme) => theme.palette.text.primary,
                textDecoration: "none",
              }}
            >
              <ListItemButton
                onClick={() => dispatch(selectGenreOrCategory(id))}
              >
                <ListItemIcon>
                  <Box
                    component="img"
                    sx={{
                      filter: (theme) =>
                        theme.palette.mode === "dark" ? "invert(1)" : "dark",
                    }}
                    src={genreIcons[name.toLocaleLowerCase() as keyof IIcons]}
                    height="30px"
                  />
                </ListItemIcon>
                <ListItemText primary={name} />
              </ListItemButton>
            </Box>
          ))
        )}
      </List>
    </>
  );
};

export default Sidebar;
