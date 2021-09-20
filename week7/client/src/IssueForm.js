import React, {useState} from 'react'

const initInputs = {
    title: "",
    message: ""

    
}

export default function IssueForm(props) {

    const [inputs, setInputs] = useState(initInputs)
    const {addIssue} = props

    function handleChange(e){
        const {name, value} = e.target
        setInputs(previnputs => ({
            ...previnputs,
            [name]: value
        }))
    }
    
    function handleSubmit(e){
        e.preventDefault()
        addIssue(inputs)
        setInputs(initInputs)
    }

    const { title, message } = inputs

    return (
        <form onSubmit={handleSubmit}>
        <input
        type="text"
        value={title}
        name="title"
        onChange={handleChange}
        placeholder="title"
        />
           <input
            type="text"
            value={message}
            name="message"
            onChange={handleChange}
            placeholder="message"
            />
            <button>ADD POST</button>
    </form>
    )
}