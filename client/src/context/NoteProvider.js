import React, { Component } from 'react'
import axios from 'axios'

const NoteContext = React.createContext()
const userAxios = axios.create()
// * Axios Interceptor
userAxios.interceptors.request.use((config) => {
    const token = localStorage.getItem("token")
    config.headers.Authorization = `Bearer ${token}`
    return config
})

class NoteProvider extends Component {
    constructor(){
        super()
        this.state = {
            user: JSON.parse(localStorage.getItem("user")) || {},
            token: localStorage.getItem("token") || "",
            authErrMsg: "",

            exactLink: "",
            resultArr: [],
            resultNum: "",
            songName: "",
            artistName: "",

            convertedNotes: [],
            addressArr: [],
            
            savedTabs: [],


        }
    }
    // * Tab Translator Functions
    tabToNote = (fretsObj, inst) => {
        const frets = Object.values(fretsObj)
        
        const notes = ["G", "G#", "A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B", "C", "C#", "D", "D#"]
        let strings
        if(inst === "guitar"){
            strings = ["E", "B", "G", "D", "A", "E"]
        } else if(inst === "bass"){
            strings = ["G", "D", "A", "E"]
        } else if (inst === "uke"){
            strings = ["A", "E", "C", "G"]
        }

        const addressArr = [] // for use in fret display diagram
        let convertedNotes = []  
        let fret  // what actual fret is depressed on each string
        
        for (let i = 0; i < frets.length; i++){
            fret = frets[i]
            addressArr.push(fret)
                // x is the index of the letter name of the open string in notes
            let x = notes.indexOf(strings[i])
            if(fret >= 12){
                fret = fret % 12
            } else  fret = Number(fret)
            
            switch(fret){
                case 0:
                    convertedNotes.push(notes[x])
                    break
                case 1:
                    convertedNotes.push(notes[x + 1])
                    break
                case 2:
                    convertedNotes.push(notes[x + 2])
                    break
                case 3:
                    convertedNotes.push(notes[x + 3])
                    break
                case 4:
                    convertedNotes.push(notes[x + 4])
                    break
                case 5:
                    convertedNotes.push(notes[x + 5])
                    break
                case 6:
                    convertedNotes.push(notes[x + 6])
                    break
                case 7:
                    convertedNotes.push(notes[x + 7])
                    break
                case 8:
                    convertedNotes.push(notes[x + 8])
                    break
                case 9:
                    convertedNotes.push(notes[x + 9])
                    break
                case 10:
                    convertedNotes.push(notes[x + 10])
                    break
                case 11:
                    convertedNotes.push(notes[x + 11])
                    break
                default:
                    break
            }

        }
        this.setState({ 
            convertedNotes: convertedNotes,
            addressArr: addressArr
        })
    }
    
    clearNotes = () => {
        this.setState({
            convertedNotes: []
        })
    }

    // * Search Functions
    searchTabs = (params) => {
        const { artistName, songName, general } = params 
        // if(artistName && songName){
        //     this.setState({ 
        //         exactLink: `http://www.songsterr.com/a/wa/bestMatchForQueryString?s=${songName}&a=${artistName}`,
        //         songName: songName,
        //         artistName: artistName}, () => console.log(this.state.exactLink))
        // } else
         if(artistName && !songName){
            const multiWordName = artistName.split(" ").join("%20")
            console.log(multiWordName)
            console.log(artistName.indexOf(" "))
            artistName.indexOf(" ") === -1 ? 
                axios.get(`http://www.songsterr.com/a/ra/songs/byartists.json?artists=${artistName}`)
                    .then(res => {
                        this.setState({ resultArr: res.data, resultNum: res.data.length })
                    })
                    .catch(err => console.log(err))
            : axios.get(`http://www.songsterr.com/a/ra/songs/byartists.json?artists="${multiWordName}"`)
                .then(res => {
                    this.setState({ resultArr: res.data, resultNum: res.data.length })
                })
                .catch(err => console.log(err))

        } else {
            axios.get(`http://www.songsterr.com/a/ra/songs.json?pattern=${general}`)
                .then(res => {
                    this.setState({ resultArr: res.data, resultNum: res.data.length })
                })
                .catch(err => console.log(err))
        }
    }

    openNewTab = link => {
        window.open(link)
    }

    clearResultCount = () => {
        this.setState({
            resultNum: "",
            resultArr: []
        })
    }

    // * SetList Functions
    saveTab = ([...info]) => {
        console.log(info)
        const { title, artist, id } = info[0]
        const newSave = {
                    title, 
                    artist: artist.name,
                    url: `http://www.songsterr.com/a/wa/song?id=${id}`,
                    }
        console.log(newSave)
        userAxios.post("./api/saved/", newSave)
            .then(res => {
                this.setState(prevState => ({
                    savedTabs: [...prevState.savedTabs, res.data]
                }))
                alert(`Added ${res.data.title} to Setlist`)
            })
            .catch(err => console.log(err))
    }

    getSetList = () => {
        userAxios.get("./api/saved/")
            .then(res => {
                this.setState({
                    savedTabs: res.data
                })
            })
            .catch(err => console.log(err))
    }

    deleteTab = _id => {
        userAxios.delete(`./api/saved/${_id}`)
            .then(res => {
                alert(res.data.msg)
                this.getSetList()
            })
            .catch(err => console.log(err))
    }

    editNotes = (_id, updatedNotes) => {
        console.log(_id)
        console.log(updatedNotes)
        const savedNotes = { notes: updatedNotes }
        userAxios.put(`/api/saved/${_id}`, savedNotes)
            .then(res => {
                console.log(res)
                this.getSetList()
            })
            .catch(err => console.log(err))
    }

    // * User Authorization Functions
    signup = credentials => {
        userAxios.post("/auth/signup", credentials)
            .then(res => {
                const { user, token } = res.data
                localStorage.setItem("user", JSON.stringify(user))
                localStorage.setItem("token", token)
                this.setState({ user, token })
            })
            .catch(err => this.handleAuthErr(err.response.data.errMsg))
    }

    login = credentials => {
        userAxios.post("/auth/login", credentials)
            .then(res => {
                const { user, token } = res.data
                localStorage.setItem("user", JSON.stringify(user))
                localStorage.setItem("token", token)
                this.setState({ user, token })
            })
            .catch(err => this.handleAuthErr(err.response.data.errMsg))
    }

    logout = () => {
        localStorage.removeItem("user")
        localStorage.removeItem("token")
        this.setState({ user: {}, token: "" })
    }

    handleAuthErr = authErrMsg => {
        this.setState({ authErrMsg })
    }


    render(){
        return(
            <NoteContext.Provider
                value={{
                    user: this.state.user,
                    token: this.state.token,
                    authErrMsg: this.state.authErrMsg,

                    signup: this.signup,
                    login: this.login,
                    logout: this.logout,

                    resultArr: this.state.resultArr,
                    exactLink: this.state.exactLink,
                    resultNum: this.state.resultNum,
                    songName: this.state.songName,
                    artistName: this.state.artistName,

                    searchTabs: this.searchTabs,
                    openNewTab: this.openNewTab,
                    setSearchType: this.setSearchType,
                    clearResultCount: this.clearResultCount,

                    convertedNotes: this.state.convertedNotes,
                    addressArr: this.state.addressArr,

                    tabToNote: this.tabToNote,
                    clearNotes: this.clearNotes,

                    saveTab: this.saveTab,
                    getSetList: this.getSetList,
                    deleteTab: this.deleteTab,
                    editNotes: this.editNotes,

                    savedTabs: this.state.savedTabs,
                    
                }}
            >
                {this.props.children}
            </NoteContext.Provider>
        )
    }
}

export default NoteProvider

export const withNotes = C => props => (
    <NoteContext.Consumer>
        { value => <C {...value} {...props} /> }
    </NoteContext.Consumer>
)