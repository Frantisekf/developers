import { useState, useEffect } from 'react'
import { fetchMoviesThunk } from '../redux/moviesSlice'
import debounce from 'lodash.debounce'
import { useAppDispatch } from '../useAppDispatch'
import styled from 'styled-components'

const SearchBarContainer = styled.div`
  background-color: ${props => props.theme.colors.background};
  padding: 2px;
  margin-bottom: 20px;
`

const SearchInput = styled.input`
  width: 100%;
  padding: 10px 0px;
  border: none;
  outline: none;
  color: ${props => props.theme.colors.textColor};
`

const SearchBar = () => {
  const [query, setQuery] = useState('')
  const dispatch = useAppDispatch()

  useEffect(() => {
    const debouncedSearch = debounce(() => {
      if (query) {
        dispatch(fetchMoviesThunk({ query, page: 1 }))
      }
    }, 500)

    if (query) debouncedSearch()
    return () => debouncedSearch.cancel()
  }, [query, dispatch])
  return (
    <SearchBarContainer>
      <SearchInput
        type="text"
        placeholder="Search for a movie..."
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
    </SearchBarContainer>
  )
}

export default SearchBar
