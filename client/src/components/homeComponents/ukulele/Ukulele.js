import React from 'react'

const Ukulele = props => {
    const { addressArr, convertedNotes } = props

    let diagram = {}
    
    addressArr.map((address, i) => {
        const noteName = convertedNotes[i]
        
        function writeAddress(string, fretNum){
            return `s${string + 1}f${fretNum}`
        }
    
       return diagram[writeAddress(i, address)] = noteName
    })

    return(
        <div className="fret-container">
            <div className="four-string">
                <div className="fret1">{diagram.s1f1}</div>
                <div className="fret">{diagram.s1f2}</div>
                <div className="fret">{diagram.s1f3}</div>
                <div className="fret">{diagram.s1f4}</div>
                <div className="fret">{diagram.s1f5}</div>
                <div className="fret back7">{diagram.s1f6}</div>
                <div className="fret back7">{diagram.s1f7}</div>
                <div className="fret back5">{diagram.s1f8}</div>
                <div className="fret back5">{diagram.s1f9}</div>
                <div className="fret back5">{diagram.s1f10}</div>
                <div className="fret back5">{diagram.s1f11}</div>
                <div className="fret back5">{diagram.s1f12}</div>
            </div>
            <div className="four-string">
                <div className="fret1">{diagram.s2f1}</div>
                <div className="fret">{diagram.s2f2}</div>
                <div className="fret dotted">{diagram.s2f3}</div>
                <div className="fret">{diagram.s2f4}</div>
                <div className="fret dotted">{diagram.s2f5}</div>
                <div className="fret back7">{diagram.s2f6}</div>
                <div className="fret back7 dotted">{diagram.s2f7}</div>
                <div className="fret back5">{diagram.s2f8}</div>
                <div className="fret back5 dotted">{diagram.s2f9}</div>
                <div className="fret back5">{diagram.s2f10}</div>
                <div className="fret back5">{diagram.s2f11}</div>
                <div className="fret back5 dotted">{diagram.s2f12}</div>
            </div>
            <div className="four-string">
                <div className="fret1">{diagram.s3f1}</div>
                <div className="fret">{diagram.s3f2}</div>
                <div className="fret dotted">{diagram.s3f3}</div>
                <div className="fret">{diagram.s3f4}</div>
                <div className="fret dotted">{diagram.s3f5}</div>
                <div className="fret back7">{diagram.s3f6}</div>
                <div className="fret back7 dotted">{diagram.s3f7}</div>
                <div className="fret back5">{diagram.s3f8}</div>
                <div className="fret back5 dotted">{diagram.s3f9}</div>
                <div className="fret back5">{diagram.s3f10}</div>
                <div className="fret back5">{diagram.s3f11}</div>
                <div className="fret back5 dotted">{diagram.s3f12}</div>
            </div>
            <div className="four-string">
                <div className="fret1">{diagram.s4f1}</div>
                <div className="fret">{diagram.s4f2}</div>
                <div className="fret">{diagram.s4f3}</div>
                <div className="fret">{diagram.s4f4}</div>
                <div className="fret">{diagram.s4f5}</div>
                <div className="fret back7">{diagram.s4f6}</div>
                <div className="fret back7">{diagram.s4f7}</div>
                <div className="fret back5">{diagram.s4f8}</div>
                <div className="fret back5">{diagram.s4f9}</div>
                <div className="fret back5">{diagram.s4f10}</div>
                <div className="fret back5">{diagram.s4f11}</div>
                <div className="fret back5">{diagram.s4f12}</div>
            </div>
        </div>
    )
}

export default Ukulele