import React, { Component } from 'react'
import { withNotes } from '../../context/NoteProvider.js'
import AuthForm from './AuthForm.js'

class Auth extends Component {
    constructor(){
        super()
        this.state = {
            username: "",
            password: "",
            toggle: false
        }
    }

    toggler = () => {
        this.setState(prevState => ({ toggle: !prevState.toggle }))
    }

    handleChange = e => {
        const { name, value } = e.target
        this.setState({ [name]: value })
    }

    handleSignup = e => {
        e.preventDefault()
        const creds = {
            username: this.state.username,
            password: this.state.password
        }
        this.props.signup(creds)
    }

    handleLogin = e => {
        e.preventDefault()
        const creds = {
            username: this.state.username,
            password: this.state.password
        }
        this.props.login(creds)
    }


    render(){
        const { username, password } = this.state
        return(
            <div className="auth-container">
                { !this.state.toggle ?
                    <>
                    <h1 className="auth-header">Sign Up</h1>
                    <AuthForm 
                        username={username}
                        password={password}
                        handleChange={this.handleChange}
                        handleSubmit={this.handleSignup}
                        btnText="Signup"
                    />
                    <button className="login-toggle" onClick={this.toggler}>Already have an account?</button>
                    <p className="error">{this.props.authErrMsg}</p>
                    </>
                    :
                    <>
                    <h1 className="auth-header">Log In</h1>
                    <AuthForm 
                        username={username}
                        password={password}
                        handleChange={this.handleChange}
                        handleSubmit={this.handleLogin}
                        btnText="Login"
                    />
                    <button className="login-toggle" onClick={this.toggler}>or make an Account</button>
                    <p className="error">{this.props.authErrMsg}</p>
                    </>
                }

            </div>
        )
    }
}

export default withNotes(Auth)