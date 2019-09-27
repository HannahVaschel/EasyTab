import React from 'react'

const InstSelect = props => {
    return(
        <select className="inst-select" name="instSelect" onChange={props.handleChange}>
            <option value="guitarFrets">Guitar</option>
            <option value="bassFrets">Bass</option>
            <option value="ukeFrets">Ukulele</option>
        </select>
    )
}

export default InstSelect