import React, { useState } from 'react'

const SavedTab = props => {
    const { title, artist, openNewTab, url, _id, deleteTab, editNotes, notes,  } = props
    
    const [ newNotes, setNewNotes ] = useState("")
    const [ canEdit, setEdit ] = useState(false)
    const [ editCount, setEditCount ] = useState(0)
    
    const handleChange = e => {
        setNewNotes(e.target.value)
        setEditCount(prevCount => prevCount + 1)
            // editCount being non-zero will allow textareas to be cleared without displaying old notes
        
    }
    const handleSubmit = e => {
        if(canEdit){
            e.preventDefault()
            editNotes(_id, newNotes ? newNotes : notes)
                // clicking save button sets canEdit back to false
            setEdit(prevEdit => !prevEdit)
        } else {  
            e.preventDefault()
                // clicking edit button changes canEdit to true
            setEdit(prevEdit => !prevEdit)
        }

    }
    const formClass = canEdit ? "note-form edit-mode" : "note-form display-mode"

    return(
        <div className="saved-tab">
            <p className="saved-link" onClick={() => openNewTab(url)}>{title} - {artist}</p>
            <form className={formClass} onSubmit={handleSubmit}>
                { canEdit ?
                    <>
                    <textarea className="edit-notes" name="notes" value={newNotes || editCount > 0 ? newNotes : notes} onChange={handleChange} cols="50" rows="3" placeholder="performance notes, metronome marking, practice reminders, etc"></textarea>
                    <button className="note-btn">Save Notes</button>
                    </>
                  :
                    <>
                    <p className="saved-notes">{notes ? notes : "use this space for notes"}</p>
                    <button className="note-btn">Edit Notes</button>
                    </>
                }
            </form>
            <button className="delete-btn" onClick={() => deleteTab(_id)}>Remove Tab</button>
        </div>
    )
}

export default SavedTab