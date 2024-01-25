import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const ErrorContainer = styled.div`
  text-align: center;
  margin-top: 50px;
  padding: 20px;
  background-color: #f8f8f8;
`

const ErrorMessage = styled.h2`
  margin-bottom: 20px;
  color: #646cff;
  font-size: 2em;
`

const ErrorText = styled.p`
  color: #333;
  font-size: 1.2em;
`

const HomeLink = styled(Link)`
  display: inline-block;
  padding: 10px 20px;
  margin-top: 20px;
  border-radius: 5px;
  background-color: #646cff;
  color: white;
  text-decoration: none;
  transition: background-color 0.3s;

  &:hover {
    background-color: #535bf2;
  }
`

const ErrorPage: React.FC = () => {
  return (
    <ErrorContainer>
      <ErrorMessage>404 - Page Not Found</ErrorMessage>
      <ErrorText>Sorry, the page you are looking for does not exist.</ErrorText>
      <HomeLink to="/">Go to Home</HomeLink>
    </ErrorContainer>
  )
}

export default ErrorPage
