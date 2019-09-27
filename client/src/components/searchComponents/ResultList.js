import React from 'react'
import Result from './Result.js'

const ResultList = props => {
  
    
    const mappedResult = props.resultArr.map(tab => <Result
                                                        key={tab.id}
                                                        {...tab} 
                                                        {...props}/>)

    return(
        mappedResult
    )
}

export default ResultList