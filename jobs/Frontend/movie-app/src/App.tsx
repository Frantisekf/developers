import { useEffect } from 'react'
import MovieList from './components/MovieList'
import { useAppDispatch } from './useAppDispatch'
import { useSelector } from 'react-redux'
import { fetchInitialMovies } from './redux/moviesSlice'
import { RootState } from './redux/store'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import theme from './styles/theme'
import MovieDetail from './components/MovieDetail'
import GlobalStyle from './styles/GlobalStyle' // Import the GlobalStyle
import ErrorPage from './pages/ErrorPage'

function App() {
  const dispatch = useAppDispatch()
  const movies = useSelector((state: RootState) => state.movies.movies)

  useEffect(() => {
    dispatch(fetchInitialMovies())
  }, [dispatch])

  return (
    <div>
      <GlobalStyle />
      <Router>
        <ThemeProvider theme={theme}>
          <h1>Movie Search App</h1>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <MovieList movies={movies} />
                </>
              }
            />
            <Route path="/movies/:movieId" element={<MovieDetail />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </ThemeProvider>
      </Router>
    </div>
  )
}

export default App
