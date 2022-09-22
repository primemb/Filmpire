import { useState } from "react";
import {
  Box,
  CircularProgress,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useAppSelector } from "../../app/hooks";
import { useGetMoviesQuery } from "../../services/TMDB";
import { MovieList, Pagination, FeaturedMovie } from "../index";

const Movies = () => {
  const [page, setPage] = useState(1);
  const theme = useTheme();
  const lg = useMediaQuery(theme.breakpoints.only("lg"));

  const numberOfMovies = lg ? 17 : 19;
  const { genreIdOrCategoryName, searchQuery } = useAppSelector(
    (state) => state.currentGenreOrCategory
  );
  const { data, isFetching, error } = useGetMoviesQuery({
    genreIdOrCategoryName,
    page,
    searchQuery,
  });

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress size="4rem" />
      </Box>
    );
  }

  if (!data?.results.length) {
    return (
      <Box display="flex" alignItems="center" mt="20px">
        <Typography variant="h4">
          No movies that match that name.
          <br />
          Please search for something else.
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" alignItems="center" mt="20px">
        <Typography variant="h4" color="red">
          An error has occured
        </Typography>
      </Box>
    );
  }

  return (
    <div>
      <FeaturedMovie movie={data.results[0]} />
      <MovieList movies={data} numberOfMovies={numberOfMovies} excludeFirst />
      <Pagination page={page} setPage={setPage} totalPage={data.total_pages} />
    </div>
  );
};

export default Movies;
