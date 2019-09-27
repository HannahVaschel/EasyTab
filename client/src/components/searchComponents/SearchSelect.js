import React from 'react'

const SearchSelect = props => {
    const { handleChange } = props

    return(
        <select className="search-select" name="searchSelect"   onChange={handleChange}>
            <option value="byGeneral">Search by Keyword</option>
            <option value="byArtist">Search by Artist</option>
            {/* <option value="byExact">Exact Title/Artist</option> */}
        </select>   
    )
}

export default SearchSelect