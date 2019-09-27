import React from 'react'
import { Link } from 'react-router-dom'

const Nav = props => {
    const { logout, token } = props
    return(
        <div className="nav-container">
            <Link className="nav-link" to="/">Home</Link>
            <Link className="nav-link" to="/tab-search">Tab Search</Link>
            <Link className="nav-link" to="/saved-tabs">My Tabs</Link>
           { token && <button className="logout-btn" onClick={logout}>Logout</button> }

        </div>
    )
}

export default Nav