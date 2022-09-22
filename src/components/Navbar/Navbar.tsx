import React, { useContext, useEffect, useState } from "react";
import {
  AppBar,
  IconButton,
  Toolbar,
  Drawer,
  Button,
  Avatar,
  Box,
  styled,
  useTheme,
  useMediaQuery,
} from "@mui/material";

import {
  Menu,
  AccountCircle,
  Brightness4,
  Brightness7,
} from "@mui/icons-material";

import { Sidebar, Search } from "../index";

import { NavLink } from "react-router-dom";
import { createSessionId, fetchToken, moviesApi } from "../../utils";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../app/hooks";
import { setUser } from "../../features/auth";
import { ColorModeContext } from "../../utils/ToggleColorMode";

const CustomToolbar = styled(Toolbar)(({ theme }) => ({
  height: "80px",
  display: "flex",
  justifyContent: "space-between",
  marginLeft: "240px",
  [theme.breakpoints.down("sm")]: {
    marginLeft: 0,
    flexWrap: "wrap",
  },
}));

const MenuButton = styled(IconButton)(({ theme }) => ({
  marginRight: theme.spacing(2),
  outline: "none",
  [theme.breakpoints.up("sm")]: {
    display: "none",
  },
}));

const drawerWidth = "240px";

const CustomDrawer = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up("sm")]: {
    width: drawerWidth,
    flexShrink: 0,
  },
}));

const Navbar = () => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const colorCtx = useContext(ColorModeContext);
  const theme = useTheme();
  const dispatch = useDispatch();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isAuthenticated, user } = useAppSelector((state) => state.user);
  const token = localStorage.getItem("request_token");
  const sessionIdFromLocalStorage = localStorage.getItem("session_id");

  useEffect(() => {
    const logInUser = async () => {
      if (token) {
        if (sessionIdFromLocalStorage) {
          const { data: userData } = await moviesApi.get(
            `/account?session_id=${sessionIdFromLocalStorage}`
          );
          dispatch(setUser(userData));
        } else {
          const sessionId = await createSessionId();

          const { data: userData } = await moviesApi.get(
            `/account?session_id=${sessionId}`
          );

          dispatch(setUser(userData));
        }
      }
    };

    logInUser();
  }, [token, sessionIdFromLocalStorage, dispatch]);

  return (
    <>
      <AppBar position="fixed">
        <CustomToolbar>
          {isMobile && (
            <MenuButton
              color="inherit"
              edge="start"
              onClick={() => setMobileOpen((state) => !state)}
            >
              <Menu />
            </MenuButton>
          )}
          <IconButton
            color="inherit"
            sx={{ ml: 1 }}
            onClick={() => {
              colorCtx.toggleColorMode();
            }}
          >
            {theme.palette.mode === "dark" ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          {!isMobile && <Search />}
          <Box>
            {!isAuthenticated ? (
              <Button
                color="inherit"
                onClick={() => {
                  fetchToken();
                }}
              >
                Login &nbsp; <AccountCircle />
              </Button>
            ) : (
              <Button
                color="inherit"
                component={NavLink}
                to={`/profile/${user?.id}`}
                onClick={() => {}}
                sx={{
                  "&:hover": {
                    color: "white",
                    textDecoration: "none",
                  },
                }}
              >
                {!isMobile && <>My Movies &nbsp;</>}
                <Avatar
                  sx={{ width: "30px", height: "30px" }}
                  alt="Profile"
                  src={
                    user?.avatar.tmdb.avatar_path
                      ? `https://www.themoviedb.org/t/p/w64_and_h64_face${user?.avatar.tmdb.avatar_path}`
                      : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
                  }
                />
              </Button>
            )}
          </Box>
          {isMobile && <Search />}
        </CustomToolbar>
      </AppBar>
      <Box>
        <CustomDrawer component="nav">
          {isMobile ? (
            <Drawer
              variant="temporary"
              anchor="right"
              open={mobileOpen}
              ModalProps={{ keepMounted: true }}
              onClose={() => setMobileOpen((state) => !state)}
              sx={{
                "& .MuiDrawer-paper": {
                  width: drawerWidth,
                },
              }}
            >
              <Sidebar setMobileOpen={setMobileOpen} />
            </Drawer>
          ) : (
            <Drawer
              variant="permanent"
              open
              sx={{
                "& .MuiDrawer-paper": {
                  width: drawerWidth,
                },
              }}
            >
              <Sidebar setMobileOpen={setMobileOpen} />
            </Drawer>
          )}
        </CustomDrawer>
      </Box>
    </>
  );
};

export default Navbar;
