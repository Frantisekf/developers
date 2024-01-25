import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import styled from 'styled-components'
import { fetchMovieDetail } from '../redux/movieDetailSlice'
import { useAppDispatch } from '../useAppDispatch'

const DetailContainer = styled.div`
  padding: 20px;
  position: relative;
`

const BackButton = styled.button`
  padding: 10px 20px;
  position: absolute;
  top: -10px;
  right: 20px;
  background-color: #f0f0f0;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  &:hover {
    background-color: #646cff;
  }
`

const Card = styled.div`
  display: flex;
  background: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  overflow: hidden;
  margin-top: 20px;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`

const ImageContainer = styled.div`
  flex: 1;
  img {
    width: 100%;
    height: auto;
  }
`

const ContentContainer = styled.div`
  flex: 2;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  h2 {
    font-size: 1.8em; // Larger font size for the title
    margin-bottom: 0.5em; // Space below the title
    color: #646cff; // Theme color for the title
  }

  p {
    font-size: 1em;
    line-height: 1.5; // Improved line spacing for readability
    margin-bottom: 1em; // Space between paragraphs
    color: #333; // Darker color for better readability
  }
`

const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto; // Pushes the footer to the bottom
`

const MovieDetail: React.FC = () => {
  const { movieId } = useParams<{ movieId: string }>()
  const movie = useSelector((state: RootState) =>
    state.movies.movies.find(m => m.id.toString() === movieId)
  )
  const navigate = useNavigate()

  const handleBack = () => {
    navigate(-1)
  }

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (movieId && !movie) {
      dispatch(fetchMovieDetail(parseInt(movieId)))
    }
  }, [dispatch, movieId, movie])

  if (!movie) {
    return <div>Movie not found</div>
  }

  return (
    <DetailContainer>
      <BackButton onClick={handleBack}>Back</BackButton>
      <Card>
        <ImageContainer>
          <img
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={movie.title}
          />
        </ImageContainer>
        <ContentContainer>
          <h2>{movie.title}</h2>
          <p>{movie.overview}</p>
          <CardFooter>
            <span>
              Release Date: <b>{movie.release_date}</b>
            </span>
            <p>
              Rating: <b>{movie.popularity}</b>
            </p>
          </CardFooter>
        </ContentContainer>
      </Card>
    </DetailContainer>
  )
}

export default MovieDetail
