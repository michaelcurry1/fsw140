
import Issue from './Issues'
import React,{useContext} from 'react'



export default function IssueList(props){
    const { issues ,updatePost, deletePost } = props
    console.log(issues)
    return (
        <div className='issue-list'>
            <h1>Posts</h1>
            {issues.map(issue => <Issue {...issue} key={issue._id} updatePost={updatePost} deletePost={deletePost} />) }
        </div>
    )
}