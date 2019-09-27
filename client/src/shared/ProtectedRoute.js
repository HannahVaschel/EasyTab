import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const ProtectedRoute = props => {
    const { user, token, redirectTo, C, path, ...rest} = props
    
    return(
        token ?
            <Route
                path={path}
                render={rProps => <C
                                {...rProps}
                                {...rest}
                                />}
            />
            :
            <Redirect to={redirectTo} />

    )
}

export default ProtectedRoute