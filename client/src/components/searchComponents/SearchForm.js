import React from 'react'


const SearchForm = props => {
    const { handleChange, handleSubmit, inputs: { songName, artistName, general }, searchType } = props
    let selectedForm
    if(searchType.searchSelect === "byArtist"){
        selectedForm = <input className="search-input" type="text" name="artistName" value={artistName} onChange={handleChange} placeholder="Artist Name"/>
    } else if (searchType.searchSelect === "byGeneral"){
        selectedForm = <input className="search-input" type="text" name="general" value={general} onChange={handleChange} placeholder="Search"/>
    } else if (searchType.searchSelect === "byExact"){
        selectedForm = 
            <>
            <input className="search-input" type="text" name="songName" value={songName} onChange={handleChange} placeholder="Song Title"/>
            <input className="search-input" type="text" name="artistName" value={artistName} onChange={handleChange} placeholder="Artist Name"/>
            </>
    }


    return(
        <form className="search-form" onSubmit={handleSubmit}>
            {selectedForm}
            <button>Search</button>
        </form>
        
    )
}

export default SearchForm