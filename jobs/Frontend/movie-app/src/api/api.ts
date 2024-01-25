import axios from 'axios'

const API_KEY = import.meta.env.VITE_APP_MOVIE_DB_API_KEY
const BASE_URL = import.meta.env.VITE_APP_BASE_URL


const movieClient = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
})

export const fetchMovies = async (query: string, page: number = 1) => {
  try {
    const response = await movieClient.get(`/search/movie`, {
      params: { query, page },
    })
    return response.data
  } catch (error) {
    console.error('Error fetching movies:', error)
    throw error
  }
}

export const fetchMovieDetails = async (movieId: number) => {
  try {
    const response = await movieClient.get(`/movie/${movieId}`)
    return response.data
  } catch (error) {
    console.error('Error fetching movie details:', error)
    throw error
  }
}

export const fetchPopularMovies = async (page = 1) => {
  try {
    const response = await movieClient.get(
      `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`,
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          accept: 'application/json',
        },
      }
    )
    return response.data
  } catch (error) {
    console.error('Error fetching popular movies:', error)
    throw error
  }
}
