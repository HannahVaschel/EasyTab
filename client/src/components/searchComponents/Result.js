import React from 'react'

const Result = props => {
    const { id, title, artist, openNewTab, saveTab, token } = props
    return(
        <div className="result-div">
            {/* { exactLink !== "" && <p onClick={() => openNewTab(exactLink)}>{songName} - {artistName}</p> } */}
            <p className="result-link" onClick={() => openNewTab(`http://www.songsterr.com/a/wa/song?id=${id}`)}>{title} - {artist.name}</p>
            <button className="result-btn" onClick={() => token ? saveTab([props]) : alert("Please login or create an account to save tabs")}>Save</button>
        
        </div>
    )
}

export default Result