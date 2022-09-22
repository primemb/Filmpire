import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IGenresApi } from "../types/Genres";
import { IMovieInformation, MovieListApi } from "../types/Movies";
import { IPerson } from "../types/Person";

const tmdbApiKey = process.env.REACT_APP_TMDB_KEY;
//https://api.themoviedb.org/3/movie/popular?api_key=<<api_key>>&language=en-US&page=1

interface IGetMoviesParam {
  genreIdOrCategoryName: string | number;
  page: number;
  searchQuery: string;
}

interface IGetRecommendationsParam {
  movie_id: string;
  list: string;
}

export interface IGetMoviesByActorIdParam {
  id: string;
  page: number;
}

interface IGetListParam {
  listName: string;
  accountId: string;
  sessionId: string;
  page: number;
}

export const tmdbApi = createApi({
  reducerPath: "tmdbApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.themoviedb.org/3" }),
  refetchOnMountOrArgChange: true,
  endpoints: (builder) => ({
    //* Get Genres
    getGenres: builder.query<IGenresApi, void>({
      query: () => `genre/movie/list?api_key=${tmdbApiKey}`,
    }),
    //* Get Movies by [Type]
    getMovies: builder.query<MovieListApi, IGetMoviesParam>({
      query: (payload) => {
        const { genreIdOrCategoryName, page, searchQuery } = payload;
        if (searchQuery) {
          return `/search/movie?query=${searchQuery}&page=${page}&api_key=${tmdbApiKey}`;
        }

        if (
          genreIdOrCategoryName &&
          typeof genreIdOrCategoryName === "string"
        ) {
          return `movie/${genreIdOrCategoryName}?page=${page}&api_key=${tmdbApiKey}`;
        }

        if (
          genreIdOrCategoryName &&
          typeof genreIdOrCategoryName === "number"
        ) {
          return `discover/movie?with_genres=${genreIdOrCategoryName}&page=${page}&api_key=${tmdbApiKey}`;
        }

        return `movie/popular?page=${page}&api_key=${tmdbApiKey}`;
      },
    }),
    //* Get Movie
    getMovie: builder.query<IMovieInformation, string>({
      query: (id) =>
        `/movie/${id}?append_to_response=videos,credits&api_key=${tmdbApiKey}`,
    }),
    //* Get user specific lists
    getRecommendations: builder.query<MovieListApi, IGetRecommendationsParam>({
      query: ({ movie_id, list }) =>
        `/movie/${movie_id}/${list}?api_key=${tmdbApiKey}`,
    }),

    //* Get Actors Details
    getActorsDetails: builder.query<IPerson, string>({
      query: (id) => `person/${id}?api_key=${tmdbApiKey}`,
    }),

    //* Get Movies by Actors id
    getMoviesByActorId: builder.query<MovieListApi, IGetMoviesByActorIdParam>({
      query: ({ id, page }) =>
        `/discover/movie?with_cast=${id}&page=${page}&api_key=${tmdbApiKey}`,
    }),
    //* Get List
    getList: builder.query<MovieListApi, IGetListParam>({
      query: ({ accountId, listName, sessionId, page }) =>
        `/account/${accountId}/${listName}?api_key=${tmdbApiKey}&session_id=${sessionId}&page=${page}`,
    }),
  }),
});

export const {
  useGetMoviesQuery,
  useGetGenresQuery,
  useGetMovieQuery,
  useGetRecommendationsQuery,
  useGetActorsDetailsQuery,
  useGetMoviesByActorIdQuery,
  useGetListQuery,
} = tmdbApi;
