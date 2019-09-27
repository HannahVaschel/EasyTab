import React from 'react'

const BassForm = props => {
    const { handleChange, handleSubmit, bGString, bDString, bAString, bEString  } = props
    return(
        <form onSubmit={handleSubmit} className="tab-form">
            <div className="tab-input-div">
                <input 
                    type="number" 
                    min="0"
                    name="bGString" 
                    value={bGString} 
                    onChange={handleChange} 
                    placeholder="G"
                />
                <input 
                    type="number" 
                    min="0"
                    name="bDString" 
                    value={bDString} 
                    onChange={handleChange} 
                    placeholder="D"
                />
                <input 
                    type="number" 
                    min="0"
                    name="bAString" 
                    value={bAString} 
                    onChange={handleChange} 
                    placeholder="A"
                />
                <input 
                    type="number" 
                    min="0"
                    name="bEString" 
                    value={bEString} 
                    onChange={handleChange} 
                    placeholder="E"
                />
            </div>
            <button>Convert!</button>
        </form>
    )
}

export default BassForm