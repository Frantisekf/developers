import React from 'react'
import styled from 'styled-components'

const PopularityContainer = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #646cff;
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 0.8em;
`

interface PopularityProps {
  rating: number
}

const Popularity: React.FC<PopularityProps> = ({ rating }) => {
  return <PopularityContainer>Rating: {rating.toFixed(1)}</PopularityContainer>
}

export default Popularity
