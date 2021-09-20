import React, {useState} from 'react'
import IssueForm from './IssueForm'

export default function Issue({title,message,deletePost,updatePost,id}){
    const [editInput, setEditInput] = useState(false);
    return (
        <div className= 'issue'>

<br></br>


{!editInput ?
            <>
            <h1>{title}</h1>
           
            <h3>{message}</h3>
            <button onClick={()=> deletePost(id)}>delete</button>
            <button onClick={()=> setEditInput(prevIn =>!prevIn)}>edit</button>
            </>
            :
            <>
            <IssueForm
           
           addIssue={(updates) =>{updatePost(id, updates)}}
           
           />
            <button onClick={()=> setEditInput(prevIn => !prevIn) }>update</button>
            </>
}

        </div>
    )
}