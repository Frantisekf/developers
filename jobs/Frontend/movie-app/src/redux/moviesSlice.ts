import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchMovies, fetchPopularMovies } from '../api/api'
import { ApiError, Movie } from '../types'

interface MoviesState {
  movies: Movie[]
  totalPages: number
  status: 'idle' | 'loading' | 'success' | 'failed'
  error: string | null
}

const initialState: MoviesState = {
  movies: [],
  totalPages: 0,
  status: 'idle',
  error: null,
}

export const fetchMoviesThunk = createAsyncThunk(
  'movies/fetchMovies',
  async (
    { query, page }: { query: string; page: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetchMovies(query, page)
      return response
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return rejectWithValue(error.response.data as ApiError)
    }
  }
)

export const fetchInitialMovies = createAsyncThunk(
  'movies/fetchInitialMovies',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchPopularMovies()
      return response
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
)

export const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchMoviesThunk.pending, state => {
        state.status = 'loading'
      })
      .addCase(
        fetchMoviesThunk.fulfilled,
        (
          state,
          action: PayloadAction<{ results: Movie[]; total_pages: number }>
        ) => {
          state.status = 'success'
          state.movies = action.payload.results
          state.totalPages = action.payload.total_pages
        }
      )
      .addCase(fetchInitialMovies.fulfilled, (state, action) => {
        state.movies = action.payload.results
        state.totalPages = action.payload.total_pages
      })
      .addCase(fetchMoviesThunk.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload as string
      })
  },
})

export default moviesSlice.reducer
