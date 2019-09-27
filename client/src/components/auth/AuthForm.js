import React from 'react'

const AuthForm = props => { 
    const { handleChange, handleSubmit, username, password, btnText } = props
    return(
        <form className="auth-form" onSubmit={handleSubmit}>
            <input className="user-input"
                type="text"
                name="username"
                value={username}
                onChange={handleChange}
                placeholder="Username"
            />
            <input className="password-input"
                type="password"
                name="password"
                value={password}
                onChange={handleChange}
                placeholder="Password"
            />

            <button>{btnText}</button>
        </form>
    )
}

export default AuthForm