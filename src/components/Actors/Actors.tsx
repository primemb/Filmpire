import { ArrowBack } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  styled,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import {
  IGetMoviesByActorIdParam,
  useGetActorsDetailsQuery,
  useGetMoviesByActorIdQuery,
} from "../../services/TMDB";
import MovieList from "../MovieList/MovieList";
import { Pagination } from "../index";
import { useState } from "react";
const ActorImage = styled("img")(({ theme }) => ({
  maxWidth: "90%",
  borderRadius: "20px",
  objectFit: "cover",
  boxShadow: "0.5em 0.5em 1em",
}));

const Actors = () => {
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const { data, isFetching, error } = useGetActorsDetailsQuery(id as string);

  const {
    data: movies,
    isFetching: isMoviesFetching,
    error: moviesError,
  } = useGetMoviesByActorIdQuery({ id, page } as IGetMoviesByActorIdParam);

  const navigate = useNavigate();
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
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate(-1)}
          color="primary"
        >
          Go back
        </Button>
      </Box>
    );
  }

  return (
    <>
      <Grid container spacing={3}>
        <Grid item lg={5} xl={4}>
          <ActorImage
            src={`https://image.tmdb.org/t/p/w780/${data?.profile_path}`}
            alt={data?.name}
          />
        </Grid>
        <Grid
          item
          lg={7}
          xl={8}
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Typography variant="h2" gutterBottom>
            {data?.name}
          </Typography>
          {data?.birthday && (
            <Typography variant="h5" gutterBottom>
              Born: {new Date(data?.birthday as string).toDateString()}
            </Typography>
          )}
          <Typography variant="body1" align="justify" gutterBottom>
            {data?.biography || "Sorry, no biography yet"}
          </Typography>
          <Box
            sx={{
              marginTop: "2rem",
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              target="_blank"
              href={`https://www.imdb.com/name/${data?.imdb_id}`}
            >
              IMDB
            </Button>
            <Button
              startIcon={<ArrowBack />}
              onClick={() => navigate(-1)}
              color="primary"
            >
              Back
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Box sx={{ margin: "2rem 0" }}>
        <Typography variant="h2" gutterBottom align="center">
          Movies
        </Typography>
        {isMoviesFetching && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress size="4rem" />
          </Box>
        )}
        {!isMoviesFetching && moviesError && (
          <Typography variant="body1" gutterBottom align="center">
            Something went wrong!
          </Typography>
        )}
        {movies && movies.results.length > 0 && (
          <MovieList movies={movies} numberOfMovies={12} />
        )}
        {movies && (
          <Pagination
            page={page}
            setPage={setPage}
            totalPage={movies.total_pages}
          />
        )}
      </Box>
    </>
  );
};

export default Actors;
