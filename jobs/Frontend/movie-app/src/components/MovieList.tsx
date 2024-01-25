import React from 'react'
import styled from 'styled-components'
import { Movie } from '../types'
import { Link } from 'react-router-dom'
import Popularity from './Popularity'

interface MovieListProps {
  movies: Movie[]
}

const MovieListContainer = styled.div`
  margin-top: 20px;
`

const MovieGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  row-gap: 55px;
  column-gap: 15px;
`

const MovieCard = styled.div`
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 0px;
  position: relative;
  text-align: center;
  transition: transform 0.2s ease-in-out;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  height: 100%;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
  }
`
const MovieImage = styled.img`
  width: 100%;
  height: 420px;
  object-fit: cover;
  border-radius: 4px 4px 0 0;
`

const MovieDescription = styled.p`
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`

const MovieTextContent = styled.div`
  padding: 10px;
`

const ImagePlaceholder = styled.div`
  width: 100%;
  height: 200px;
  background-color: #grey;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1em;
  color: white;
  border-radius: 4px;
`

const MovieList: React.FC<MovieListProps> = ({ movies }) => {
  return (
    <MovieListContainer>
      <h2>Movie Results:</h2>
      <MovieGrid>
        {movies.map(movie => (
          <Link key={movie.id} to={`/movies/${movie.id}`}>
            <MovieCard key={movie.id}>
              <Popularity rating={movie.popularity} />
              {movie.poster_path ? (
                <MovieImage
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={movie.title}
                />
              ) : (
                <ImagePlaceholder>No Image Available</ImagePlaceholder>
              )}
              <MovieTextContent>
                <h3>{movie.title}</h3>
                <MovieDescription>{movie.overview}</MovieDescription>
              </MovieTextContent>
            </MovieCard>
          </Link>
        ))}
      </MovieGrid>
    </MovieListContainer>
  )
}

export default MovieList
