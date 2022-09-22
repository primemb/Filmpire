import { Box, Typography } from "@mui/material";
import React from "react";
import { MovieListApi } from "../../types/Movies";
import { Movie } from "../index";

interface IRatedCardsProps {
  title: string;
  movies: MovieListApi;
}

const RatedCards = ({ movies, title }: IRatedCardsProps) => {
  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        {title}
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        {movies?.results.map((movie, i) => (
          <Movie key={movie.id} movie={movie} id={i} />
        ))}
      </Box>
    </Box>
  );
};

export default RatedCards;
