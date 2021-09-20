import IssueForm from './IssueForm';
import IssueList from './IssueList';
import './App.css';
import {useState, useEffect} from "react";
import axios from "axios"

function App() {
  const [post, setPost] = useState([]);
  const getPost = () => {
    axios.get ('/Post')
    .then(res => setPost(res.data))
    .catch(err => console.log(err));
  };
 useEffect(()=>{
  getPost();
 },[])
  const AddPost = (newPost) => {
    axios.post ('http://localhost:9000/post', newPost)
    .then(res =>{
      console.log(res)
      //setPost(prevPost =>[...prevPost, res.data])
     getPost();
    })
   .catch(err => console.log(err));
  };


const deletePost = (postId) => {
  axios.delete (`/post/${postId}`)
  .then(res =>{
    getPost();
    //setPost(prevPost => prevPost.filter(post => post._id !== postId))
  })
  .catch(err => console.log(err))
};

const updatePost = (postId, updates) => {
  axios.put(`/post/${postId}`,updates)
  .then(res =>{
    getPost();
    //setPost(prevPost => prevPost.map(post => post._id !== postId ? post : res.data))
  })
}

  return (
    <div className="App">
     <IssueForm addIssue={AddPost}/>
     <IssueList issues={post} updatePost={updatePost} deletePost={deletePost}/>
    </div>
  );
}

export default App;
