import React from "react";
import { Movie as MovieInterface } from "../../types/Movies";
import {
  Typography,
  Grid,
  Grow,
  Tooltip,
  Rating,
  styled,
  Box,
} from "@mui/material";
import { NavLink } from "react-router-dom";

interface IMovieProps {
  id: number;
  movie: MovieInterface;
}

const MovieTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  textOverflow: "ellipsis",
  width: "230px",
  whiteSpace: "nowrap",
  overflow: "hidden",
  marginTop: "10px",
  marginBottom: "0",
  textAlign: "center",
}));
const Movie = ({ id, movie }: IMovieProps) => {
  return (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={2} sx={{ padding: "10px" }}>
      <Grow in key={id} timeout={(id + 1) * 250}>
        <Box
          component={NavLink}
          to={`/movie/${movie.id}`}
          sx={{
            alignItems: "center",
            fontWeight: "Bolder",
            display: { xs: "flex" },
            textDecoration: "none",
            flexDirection: { xs: "column" },
            "&:hover": {
              cursor: "pointer",
            },
          }}
        >
          <Box
            component="img"
            sx={{
              borderRadius: "20px",
              height: "300px",
              marginBottom: "10px",
              transition: (theme) =>
                theme.transitions.create(["transform"], {
                  duration: theme.transitions.duration.standard,
                }),
              "&:hover": {
                transform: "scale(1.05)",
              },
            }}
            alt={movie.title}
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                : "https://www.fillmurray.com/200/300"
            }
          />
          <MovieTitle variant="h5">{movie.title}</MovieTitle>
          <Tooltip disableTouchListener title={`${movie.vote_average} / 10`}>
            <div>
              <Rating readOnly value={movie.vote_average / 2} precision={0.1} />
            </div>
          </Tooltip>
        </Box>
      </Grow>
    </Grid>
  );
};

export default Movie;
