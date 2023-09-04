import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addMovieToFavoriteMovies,
  getFavoriteMovieId,
} from "../storage/slices/userSlice";
import OnLoadingScreen from "../components/OnLoadingScreen";
import axios from "axios";
import { getMovieDetailByID } from "../storage/slices/movieSlice";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Link } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import ScrollToTop from "../components/ScrollToTop";
import MovieListCard from "../components/MovieListCard";

const FavoriteMoviePage = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const { favoriteMovies } = useSelector((state) => state.user);
  const { user } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);

 
  useEffect(() => {
    fetchFavoriteMovies();
  }, [dispatch, user.user_id]);

  const fetchFavoriteMovies = async () => {
    try {
      const results = await dispatch(getFavoriteMovieId(user.user_id));
      const favoriteMovieIds = results.payload.favorite_movie;

      //Receive promise, create array of promise
      const moviePromises = favoriteMovieIds.map((movieId) =>
        dispatch(getMovieDetailByID(movieId))
      );

      const resultPromise = await Promise.all(moviePromises);

      // add favorite movie to state
      resultPromise.forEach((movieDetail) => {
        dispatch(addMovieToFavoriteMovies(movieDetail.payload));
      });

      setIsLoading(false);
    } catch (error) {
      setIsLoading(true);
      console.error(error);
    }
  };

 
  return (
    <div className=" ">
      {isLoading ? <OnLoadingScreen /> : <MovieListCard movies={favoriteMovies} title="Favorite Movie"   />}
    </div>
  );
};

export default FavoriteMoviePage;
