import React from "react";
import { MovieListApi } from "../../types/Movies";
import { Grid } from "@mui/material";
import { Movie } from "../index";

interface IMovieListProps {
  movies: MovieListApi | undefined;
  numberOfMovies?: number;
  excludeFirst?: boolean;
}

const MovieList = ({
  movies,
  numberOfMovies,
  excludeFirst,
}: IMovieListProps) => {
  const startFrom = excludeFirst ? 1 : 0;
  return (
    <Grid
      container
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "flex-start",
        overflow: "hidden",
      }}
    >
      {movies?.results.slice(startFrom, numberOfMovies).map((movie, i) => (
        <Movie key={movie.id} movie={movie} id={i} />
      ))}
    </Grid>
  );
};

export default MovieList;
