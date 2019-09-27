import React from 'react'
import SavedTab from './SavedTab.js'

const SavedList = props => {
    const { savedTabs } = props
    const mappedSaves = savedTabs.map(tab => <SavedTab
                                                    key={tab._id} 
                                                    {...tab}
                                                    {...props} />)
    return(
        <div className="saved-container">
            {mappedSaves}
        </div>
    )
}

export default SavedList