import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import { Movie } from "../../types/Movies";

interface IFeaturedMovieProps {
  movie: Movie;
}

const FeaturedMovie = ({ movie }: IFeaturedMovieProps) => {
  if (!movie) return null;
  return (
    <Box
      component={NavLink}
      to={`/movie/${movie.id}`}
      sx={{
        marginBottom: "20px",
        display: "flex",
        justifyContent: "center",
        height: "490px",
        textDecoration: "none",
      }}
    >
      <Card
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
          flexDirection: "column",
          "&.MuiCard-root": {
            position: "relative",
          },
        }}
      >
        <CardMedia
          image={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            height: "100%",
            width: "100%",
            backgroundColor: "rgba(0,0,0,0.75)",
            backgroundBlendMode: "darken",
          }}
        />
        <Box padding="20px">
          <CardContent
            sx={{
              color: "#fff",
              width: { md: "40%", sm: "100%" },
              "&.MuiCardContent-root": {
                position: "relative",
                backgroundColor: "transparent",
              },
            }}
          >
            <Typography variant="h5" gutterBottom>
              {movie.title}
            </Typography>
            <Typography variant="body2" gutterBottom>
              {movie.overview}
            </Typography>
          </CardContent>
        </Box>
      </Card>
    </Box>
  );
};

export default FeaturedMovie;
