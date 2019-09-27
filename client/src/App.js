import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { withNotes } from './context/NoteProvider.js'
import Nav from './Nav.js'
import ProtectedRoute from './shared/ProtectedRoute.js'
import Home from './components/homeComponents/Home.js'
import Search from './components/searchComponents/Search.js'
import Auth from './components/auth/Auth.js'
import SetList from './components/savedComponents/SetList.js'
import Footer from './Footer.js'

const App = props => {
    const { token, user, logout } = props
    return(
        <div>
            <Nav token={token} logout={logout}/>
            <Switch>
                <Route 
                    exact path="/"
                    component={Home}
                />
                <Route 
                    path="/tab-search"
                    component={Search}
                />
                <Route
                    path="/auth"
                    render={rProps => !token ?
                                <Auth {...rProps}/> :
                                <Redirect to="saved-tabs"/>}
                />
                <ProtectedRoute 
                        token={token}
                        path="/saved-tabs"
                        C={SetList}
                        redirectTo="/auth"
                        user={user}
                />

            </Switch>
            <Footer/>
        </div>
    )
}

export default withNotes(App)