import React, { useState } from 'react'
import { withNotes } from '../../context/NoteProvider.js'
import Form from '../../shared/Form.js'
import GuitarForm from './guitar/GuitarForm.js'
import Guitar from './guitar/Guitar.js'
import BassForm from './bass/BassForm.js'
import Bass from './bass/Bass.js'
import Ukulele from './ukulele/Ukulele.js'
import UkeForm from './ukulele/UkeForm.js'
import InstSelect from './InstSelect.js'

const Home = props => {
    const { tabToNote, convertedNotes, clearNotes } = props

    const [ instSelect, setInstSelect ] = useState("guitarFrets")

    const handleSelect = e => {
        const { value } = e.target
        setInstSelect(value)
        clearNotes()
    }

    const components = {}
    let formInputs
    let instrument

    if(instSelect === "guitarFrets"){
        formInputs = { gEStringHi: "", gBString: "", gGString: "", gDString: "", gAString: "", gEString: "" }
        instrument = "guitar"
        components.instForm = GuitarForm
        components.fretDiagram = Guitar
    } else if(instSelect === "bassFrets"){
        formInputs = { bGString: "", bDString: "", bAString: "", bEString: ""  }
        components.instForm = BassForm
        components.fretDiagram = Bass
        instrument = "bass"
    } else if(instSelect === "ukeFrets"){
        formInputs = { uAString: "", uEString: "", uCString: "", uGString: "" }
        components.instForm = UkeForm
        components.fretDiagram = Ukulele
        instrument = "uke"
    }


    return(
        <div className="home-container">
            <h1 className="home-header">EasyTab</h1>
            <p className="instructions">Enter tab numbers to get note-name conversions.</p>
            
            

            <InstSelect value={instSelect} handleChange={handleSelect}/>
            <div className="home-sidebar"></div>
                {components.instForm &&
                    <Form
                        inputs={formInputs}
                        submit={ inputs => tabToNote(inputs, instrument) }
                        render={ formProps => <components.instForm {...formProps} test={"test"} />}
                    /> }
              
           

            <div className="note-container">
                <p>{convertedNotes[0]}</p>
                <p>{convertedNotes[1]}</p>
                <p>{convertedNotes[2]}</p>
                <p>{convertedNotes[3]}</p>
                <p>{convertedNotes[4]}</p>
                <p>{convertedNotes[5]}</p>
            </div>

            <components.fretDiagram {...props}/>
        </div>
    )
}

export default withNotes(Home)