import React, { useState } from 'react'
import { withNotes } from '../../context/NoteProvider.js'
import SearchForm from './SearchForm.js'
import Form from '../../shared/Form.js'
import ResultList from './ResultList.js'
import SearchSelect from './SearchSelect.js'

const Search = props => {
    const { openNewTab,  resultArr, searchTabs, resultNum, authErrMsg, clearResultCount } = props

    const [ searchSelect, setSearchSelect ] = useState({ searchSelect: "byGeneral" })

    const handleSelect = e => {
        const { name, value } = e.target
        setSearchSelect({ [name]: value })
        clearResultCount()
    }
    
    return(
        <div className="search-container">
            <h1 className="search-header">Search</h1>
            <Form 
                inputs={{ songName: "", artistName: "", general: "" }}
                submit={ inputs => searchTabs(inputs) }
                render={ formProps => <SearchForm {...formProps} searchType={searchSelect} {...props}/>}
            />
            <SearchSelect value={searchSelect} handleChange={handleSelect}/>

            <div className="search-message-div">
                { resultNum !== "" && <p>{resultNum} results found</p> }
            </div>            
            <div className="result-container">
                {/* { exactLink !== "" && <p onClick={() => openNewTab(exactLink)}>{songName} - {artistName}</p> } */}
                {resultArr.length > 0 && <ResultList {...props}/> }
            </div>
        </div>
    )
}

export default withNotes(Search)