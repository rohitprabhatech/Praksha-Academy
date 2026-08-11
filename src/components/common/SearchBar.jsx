import { Button, InputBase } from '@mui/material'
import { FiSearch } from 'react-icons/fi'
import './SearchBar.css'

function SearchBar({
 placeholder = 'What do you want to learn?',
 buttonLabel = 'Search',
 compact = false,
 className = '',
}) {
 return (
  <form
   className={`search-bar${compact ? ' search-bar--compact' : ''}${className ? ` ${className}` : ''}`}
   role="search"
   aria-label="Course search"
   onSubmit={(event) => event.preventDefault()}
  >
   <FiSearch className="search-bar-icon" size={20} aria-hidden="true" />
   <InputBase
    className="search-bar-input"
    placeholder={placeholder}
    inputProps={{ 'aria-label': placeholder }}
    fullWidth
   />
   <Button type="submit" variant="contained" color="primary" className="search-bar-button">
    {buttonLabel}
   </Button>
  </form>
 )
}

export default SearchBar
