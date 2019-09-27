import { Component } from 'react'

class Form extends Component {
    constructor(props){
        super(props)
        this.state = {
            inputs: props.inputs
        }
    }

    componentWillReceiveProps(nextProps){
            // every input is just going to start as an empty string, so we need to pay attention to the name of the first string
        if(Object.keys(nextProps.inputs)[0] !== Object.keys(this.props.inputs)[0]){
            this.setState({ inputs: nextProps.inputs })
        }
    }

    handleChange = e => {
        const { name, value } = e.target
        this.setState(prevState => ({
            inputs: {
                ...prevState.inputs,
                [name]: value
            }
        }))
    }

    handleSubmit = e => {
        e.preventDefault()
        this.props.submit(this.state.inputs)
        this.setState({ inputs: this.props.inputs })
    }

    render(){
        return this.props.render({
            inputs: this.state.inputs,
            handleChange: this.handleChange,
            handleSubmit: this.handleSubmit
        })
            
    }
}

export default Form