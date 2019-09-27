import React from 'react'

const GuitarForm = props => {
    const { handleChange, handleSubmit } = props
    const { gEStringHi, gBString, gGString, gDString, gAString, gEString } = props.inputs
    console.log(props)
    return(
        <form onSubmit={handleSubmit} className="tab-form">
            <div className="tab-input-div">
                <input 
                    type="number"
                    min="0" 
                    name="gEStringHi" 
                    value={gEStringHi} 
                    onChange={handleChange} 
                    placeholder="E"
                />
                <input 
                    type="number" 
                    min="0"
                    name="gBString" 
                    value={gBString} 
                    onChange={handleChange} 
                    placeholder="B"
                />
                <input 
                    type="number" 
                    min="0"
                    name="gGString" 
                    value={gGString} 
                    onChange={handleChange} 
                    placeholder="G"
                />
                <input 
                    type="number" 
                    min="0"
                    name="gDString" 
                    value={gDString} 
                    onChange={handleChange} 
                    placeholder="D"
                />
                <input 
                    type="number" 
                    min="0"
                    name="gAString" 
                    value={gAString} 
                    onChange={handleChange} 
                    placeholder="A"
                />
                <input 
                    type="number" 
                    min="0"
                    name="gEString" 
                    value={gEString} 
                    onChange={handleChange} 
                    placeholder="E"
                />
            </div>
            <button>Convert!</button>
        </form>
    )
}

export default GuitarForm