import React, { useState, useEffect } from "react";
import {
  Box,
  ButtonGroup,
  CircularProgress,
  Grid,
  Rating,
  styled,
  Typography,
  useMediaQuery,
  Link,
  Button,
  Modal,
} from "@mui/material";
import {
  ArrowBack,
  Favorite,
  FavoriteBorderOutlined,
  Language,
  Movie as MovieIcon,
  PlusOne,
  Remove,
  Theaters,
} from "@mui/icons-material";
import { NavLink, useParams } from "react-router-dom";
import {
  useGetListQuery,
  useGetMovieQuery,
  useGetRecommendationsQuery,
} from "../../services/TMDB";
import genreIcons from "../../assets/genres/index";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectGenreOrCategory } from "../../features/currentGenreOrCategory";
import MovieList from "../MovieList/MovieList";
import axios from "axios";

type IIcons = typeof genreIcons;

const PosterImage = styled("img")(({ theme }) => ({
  borderRadius: "20px",
  boxShadow: "0.5em 1em 1em rgb(64,64,70)",
  width: "100%",
  height: "auto",
  [theme.breakpoints.up("xl")]: {
    width: "80%",
  },
  [theme.breakpoints.down("md")]: {
    margin: "0 auto",
    width: "100%",
  },
}));

const MovieGrid = styled(Grid)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-around",
  margin: "10px 0",
  [theme.breakpoints.down("lg")]: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const CastImage = styled("img")({
  width: "100%",
  maxWidth: "7em",
  height: "8em",
  objectFit: "cover",
  borderRadius: "10px",
});

// const ButtonContainer = styled(Box)(({ theme }) => ({}));

const ButtonContainer = React.forwardRef(function ButtonContainer(
  props: any,
  ref
) {
  return <Box ref={ref} component={props.component} {...props} />;
});

const StyledButtonContainer = styled(ButtonContainer)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
  marginBottom: "16px",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
  },
}));

const MovieInformation = () => {
  const isMobile = useMediaQuery("(max-width:600px)");

  const dispatch = useAppDispatch();

  const [open, setOpen] = useState(false);

  const user = useAppSelector((state) => state.user);

  const { id } = useParams();

  const { data, isFetching, error } = useGetMovieQuery(id as string);

  const [isMovieFavoritted, setIsMovieFavoritted] = useState<boolean>(false);

  const [isMovieWatchlisted, setIsMovieWatchlisted] = useState<boolean>(false);

  const { data: recommendations, isFetching: isRecommendationsFetching } =
    useGetRecommendationsQuery({
      list: "/recommendations",
      movie_id: id as string,
    });

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

  useEffect(() => {
    setIsMovieFavoritted(
      !!favoriteMovies?.results.find((movie) => movie.id === data?.id)
    );
  }, [favoriteMovies, data]);

  useEffect(() => {
    setIsMovieWatchlisted(
      !!watchlistMovies?.results.find((movie) => movie.id === data?.id)
    );
  }, [watchlistMovies, data]);

  const addToFavorites = () => {
    if (!user.user?.id) return;
    axios.post(
      `https://api.themoviedb.org/3/account/${user.user?.id}/favorite?api_key=${process.env.REACT_APP_TMDB_KEY}&session_id=${user.sessionId}`,
      {
        media_type: "movie",
        media_id: id,
        favorite: !isMovieFavoritted,
      }
    );
    setIsMovieFavoritted((prevState) => !prevState);
  };
  const addToWatchlist = () => {
    if (!user.user?.id) return;
    axios.post(
      `https://api.themoviedb.org/3/account/${user.user?.id}/watchlist?api_key=${process.env.REACT_APP_TMDB_KEY}&session_id=${user.sessionId}`,
      {
        media_type: "movie",
        media_id: id,
        watchlist: !isMovieWatchlisted,
      }
    );
    setIsMovieWatchlisted((prevState) => !prevState);
  };

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <CircularProgress size="8rem" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <NavLink to="/">Something has gone wrong - Go back</NavLink>
      </Box>
    );
  }

  return (
    <>
      <MovieGrid container>
        <Grid
          item
          sm={12}
          lg={4}
          sx={{ marginBottom: "30px", display: "flex" }}
        >
          <PosterImage
            src={`https://image.tmdb.org/t/p/w500/${data?.poster_path}`}
            alt={data?.title}
          />
        </Grid>
        <Grid item container direction="column" lg={7}>
          <Typography variant="h3" align="center" gutterBottom>
            {data?.title} ({data?.release_date.split("-")[0]})
          </Typography>
          <Typography variant="h5" align="center" gutterBottom>
            {data?.tagline}
          </Typography>
          <MovieGrid item>
            <Box display="flex" justifyContent="center">
              <Rating readOnly value={(data?.vote_average || 0) / 2} />
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{ marginLeft: "10px" }}
              >
                {data?.vote_average.toFixed(2)} / 10
              </Typography>
            </Box>
            <Typography variant="h6" align="center" gutterBottom>
              {data?.runtime}min | Language:{" "}
              {data?.spoken_languages.length && data?.spoken_languages[0].name}
            </Typography>
          </MovieGrid>
          <Grid
            item
            sx={{
              margin: "10px 0",
              display: "flex",
              justifyContent: "space-around",
              flexWrap: "wrap",
            }}
          >
            {data?.genres?.map((genre) => {
              return (
                <Box
                  component={NavLink}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: { sm: "0.5rem 1rem" },
                    textDecoration: "none",
                  }}
                  key={genre.id}
                  to="/"
                  onClick={() => dispatch(selectGenreOrCategory(genre.id))}
                >
                  <Box
                    component="img"
                    sx={{
                      filter: (theme) =>
                        theme.palette.mode === "dark" ? "invert(1)" : "dark",
                      marginRight: "10px",
                    }}
                    src={
                      genreIcons[genre.name.toLocaleLowerCase() as keyof IIcons]
                    }
                    height="30px"
                  />
                  <Typography color="text.primary">{genre.name}</Typography>
                </Box>
              );
            })}
          </Grid>
          <Typography variant="h5" gutterBottom sx={{ marginTop: "10px" }}>
            Overview
          </Typography>
          <Typography sx={{ marginBottom: "2rem" }}>
            {data?.overview}
          </Typography>
          <Typography variant="h5" gutterBottom>
            Top Cast
          </Typography>
          <Grid item container spacing={2}>
            {data &&
              data.credits?.cast
                ?.map(
                  (credit) =>
                    credit.profile_path && (
                      <Grid
                        key={credit.id}
                        item
                        xs={4}
                        md={2}
                        component={NavLink}
                        to={`/actors/${credit.id}`}
                        sx={{ textDecoration: "none" }}
                      >
                        <CastImage
                          src={`https://image.tmdb.org/t/p/w500/${credit.profile_path}`}
                          alt={credit.name}
                        />
                        <Typography color="text.primary">
                          {credit.name}
                        </Typography>
                        <Typography color="text.secondary">
                          {credit.character.split("/")[0]}
                        </Typography>
                      </Grid>
                    )
                )
                .slice(0, 6)}
          </Grid>
          <Grid item container sx={{ marginTop: "2rem" }}>
            <StyledButtonContainer>
              <StyledButtonContainer
                component={Grid}
                item
                container
                xs={12}
                sm={6}
              >
                <ButtonGroup
                  orientation={isMobile ? "vertical" : "horizontal"}
                  size="medium"
                  variant="outlined"
                >
                  <Link
                    component={Button}
                    target="_blank"
                    rel="noopener noreferrer"
                    endIcon={<Language />}
                    href={data?.homepage}
                    sx={{ textDecoration: "none" }}
                  >
                    Website
                  </Link>
                  <Link
                    component={Button}
                    target="_blank"
                    rel="noopener noreferrer"
                    endIcon={<MovieIcon />}
                    href={`https://www.imdb.com/title/${data?.imdb_id}`}
                    sx={{ textDecoration: "none" }}
                  >
                    IMDB
                  </Link>
                  <Button
                    endIcon={<Theaters />}
                    onClick={() => {
                      setOpen(true);
                    }}
                  >
                    Trailer
                  </Button>
                </ButtonGroup>
              </StyledButtonContainer>
              <StyledButtonContainer
                component={Grid}
                item
                container
                xs={12}
                sm={6}
              >
                <ButtonGroup
                  size="medium"
                  orientation={isMobile ? "vertical" : "horizontal"}
                  variant="outlined"
                >
                  <Button
                    onClick={addToFavorites}
                    endIcon={
                      isMovieFavoritted ? (
                        <FavoriteBorderOutlined />
                      ) : (
                        <Favorite />
                      )
                    }
                  >
                    {isMovieFavoritted ? "Unfavorite" : "Favorite"}
                  </Button>
                  <Button
                    onClick={addToWatchlist}
                    endIcon={isMovieWatchlisted ? <Remove /> : <PlusOne />}
                  >
                    Watchlist
                  </Button>
                  <Button
                    endIcon={<ArrowBack />}
                    sx={{ borderColor: "primary.main" }}
                  >
                    <Typography
                      component={NavLink}
                      sx={{ textDecoration: "none" }}
                      to="/"
                      color="inherit"
                      variant="subtitle2"
                    >
                      Back
                    </Typography>
                  </Button>
                </ButtonGroup>
              </StyledButtonContainer>
            </StyledButtonContainer>
          </Grid>
        </Grid>
      </MovieGrid>
      <Box
        sx={{
          marginTop: "5rem",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h3" gutterBottom align="center">
          You might also like
        </Typography>
        {isRecommendationsFetching && <CircularProgress size="8rem" />}
        {recommendations &&
        !isRecommendationsFetching &&
        recommendations.results.length ? (
          <MovieList movies={recommendations} numberOfMovies={12} />
        ) : (
          <Box>Sorry, nothing was found.</Box>
        )}
      </Box>
      <Modal closeAfterTransition open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={() => setOpen(false)}
        >
          {data?.videos?.results.length && (
            <iframe
              allow="autoplay"
              allowFullScreen
              title={data.title}
              src={`https://www.youtube.com/embed/${data.videos.results[0].key}`}
              style={{
                border: "none",
                width: isMobile ? "90%" : "50%",
                height: isMobile ? "90%" : "50%",
              }}
            />
          )}
        </Box>
      </Modal>
    </>
  );
};

export default MovieInformation;
