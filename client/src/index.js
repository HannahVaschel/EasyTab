import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.js'
import { BrowserRouter } from 'react-router-dom'
import NoteProvider from './context/NoteProvider.js'
import './styles.css'

ReactDOM.render(
    <BrowserRouter>
        <NoteProvider>
            <App/>
        </NoteProvider>
    </BrowserRouter>, 
    document.getElementById('root'))