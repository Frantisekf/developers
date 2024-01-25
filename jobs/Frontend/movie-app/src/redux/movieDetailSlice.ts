import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  SerializedError,
} from '@reduxjs/toolkit'
import { fetchMovieDetails } from '../api/api'

interface MovieDetail {
  id: number
  title: string
  description: string
}

interface MovieDetailState {
  movieDetail: MovieDetail | null
  status: 'idle' | 'loading' | 'success' | 'failed'
  error: string | null
}

const initialState: MovieDetailState = {
  movieDetail: null,
  status: 'idle',
  error: null,
}

export const fetchMovieDetail = createAsyncThunk<
  MovieDetail,
  number,
  { rejectValue: string }
>('movieDetail/fetchMovieDetail', async (movieId, { rejectWithValue }) => {
  try {
    const response = await fetchMovieDetails(movieId)
    return response
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.response && error.response.data) {
      return rejectWithValue(error.response.data.message)
    }
    return rejectWithValue('An unknown error occurred')
  }
})

export const movieDetailSlice = createSlice({
  name: 'movieDetail',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchMovieDetail.pending, state => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(
        fetchMovieDetail.fulfilled,
        (state, action: PayloadAction<MovieDetail>) => {
          state.status = 'success'
          state.movieDetail = action.payload
        }
      )
      .addCase(
        fetchMovieDetail.rejected,
        (
          state,
          action: PayloadAction<unknown, string, unknown, SerializedError>
        ) => {
          state.status = 'failed'
          state.error = action.error.message || 'Unknown error'
        }
      )
  },
})

export default movieDetailSlice.reducer
