import React from 'react'
import "./SearchBar.css"
import { Button, InputAdornment, TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import InfoIcon from '@mui/icons-material/Info';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

const SearchBar = () => {
  return (
    <div className="searchBar">
      <TextField
        className="searchBarInput"
        placeholder="Type to search for an asset"
        variant="standard"
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          style: {
            borderRadius: 9999, 
            color: 'white', 
            backgroundColor: 'gray', 
            height: 50, 
            paddingLeft: 16,
            marginRight: 16
          },
          disableUnderline: true,
        }}
      />
      <Button className="searchBarFilterButton" startIcon={<FilterAltIcon />}>Filter</Button>
      <div className="searchBarStatsIcon">
        <InfoIcon />
      </div>
    </div>
  )
}

export default SearchBar