import {
  createSlice,
  createAsyncThunk,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import { APIKey, APIKeyTMDB } from "../../services/MovieApiKey";
import { instance1, instance2 } from "../../services/MovieApi";

const initialState = {
  movies: [],
  trendingMovies: [],
  popularMovies: [],
  allMovie: [],
  totalPages:0,
  isLoading: false,
  isSuccess: false,
  message: false,
};

export const getMovies = createAsyncThunk(
  "movieList/fetchMovie",
  async (arg, { rejectWithValue }) => {
    try {
      const searchKey = arg ? arg : "Thor";
      const res = await instance1.get(
        `?apikey=${APIKey}&s=${searchKey}&type=movie`
      );
      // console.log(res)
      return [...res.data.Search];
    } catch (err) {
      rejectWithValue(err.response.data);
    }
  }
);

export const getTrendingMovies = createAsyncThunk(
  "movieList/fetchTrendingMovie",
  async (arg, { rejectWithValue }) => {
    try {
      const res = await instance2.get(
        `trending/movie/week?api_key=${APIKeyTMDB}`
      );
      return [...res.data.results];
    } catch (err) {
      rejectWithValue(err.response.data);
    }
  }
);

export const getPopularMovies = createAsyncThunk(
  "movieList/fetchPopularMovie",
  async (arg, { rejectWithValue }) => {
    try {
      const res = await instance2.get(`movie/popular?api_key=${APIKeyTMDB}`);
      return [...res.data.results];
    } catch (err) {
      rejectWithValue(err.response.data);
    }
  }
);

export const getAllMovies = createAsyncThunk(
  "movieList/fetchAllMovie",
  async (page=1, { rejectWithValue }) => {
    try {
      const res = await instance2.get(`discover/movie?api_key=${APIKeyTMDB}&&page=${page}`);
      console.log(res)
      return {
        movies: [...res.data.results],
        totalPages: res.data.total_pages, 
      } 
    } catch (err) {
      rejectWithValue(err.response.data);
    }
  }
);

const movieSlice = createSlice({
  name: "movieList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMovies.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getMovies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.movies = action.payload;
        state.isSuccess = true;
      })
      .addCase(getMovies.rejected, (state, action) => {
        state.message = action.payload;
        state.isLoading = false;
        state.isSuccess = false;
        // console.log(action);
      })
      .addCase(getTrendingMovies.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getTrendingMovies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.trendingMovies = action.payload;
        state.isSuccess = true;
      })
      .addCase(getTrendingMovies.rejected, (state, action) => {
        state.message = action.payload;
        state.isLoading = false;
        state.isSuccess = false;
        // console.log(action);
      })
      .addCase(getPopularMovies.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getPopularMovies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.popularMovies = action.payload;
        state.isSuccess = true;
      })
      .addCase(getPopularMovies.rejected, (state, action) => {
        state.message = action.payload;
        state.isLoading = false;
        state.isSuccess = false;
        // console.log(action);
      })
      .addCase(getAllMovies.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getAllMovies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allMovie = action.payload.movies;
        state.totalPages = action.payload.totalPages;
        state.isSuccess = true;
      })
      .addCase(getAllMovies.rejected, (state, action) => {
        state.message = action.payload;
        state.isLoading = false;
        state.isSuccess = false;
        // console.log(action);
      });
  },
});

export default movieSlice.reducer;
