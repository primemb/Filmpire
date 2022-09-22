import { ExitToApp } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { logout } from "../../features/auth";
import { useGetListQuery } from "../../services/TMDB";
import { MovieListApi } from "../../types/Movies";
import { RatedCards } from "../index";

const Profile = () => {
  const user = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { data: favoriteMovies } = useGetListQuery(
    {
      listName: "favorite/movies",
      accountId: user?.user?.id.toString() as string,
      sessionId: user.sessionId,
      page: 1,
    },
    { skip: !!!user.user?.id }
  );

  const { data: watchlistMovies } = useGetListQuery(
    {
      listName: "watchlist/movies",
      accountId: user?.user?.id.toString() as string,
      sessionId: user.sessionId,
      page: 1,
    },
    { skip: !!!user.user?.id }
  );

  const logoutClickHandler = () => {
    dispatch(logout());
    navigate("/", { replace: true });
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h4" gutterBottom>
          My Profile
        </Typography>
        <Button color="inherit" onClick={logoutClickHandler}>
          Logout &nbsp; <ExitToApp />
        </Button>
      </Box>
      {!favoriteMovies?.results.length && !watchlistMovies?.results.length ? (
        <Typography variant="h5">
          Add favorites or watchlist some movies to see them here!
        </Typography>
      ) : (
        <Box>
          <RatedCards
            title="Favorite Movies"
            movies={favoriteMovies as MovieListApi}
          />
          <RatedCards
            title="Watchlist Movies"
            movies={watchlistMovies as MovieListApi}
          />
        </Box>
      )}
    </Box>
  );
};

export default Profile;
