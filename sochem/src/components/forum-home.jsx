import React, { useState, useEffect } from 'react';
import Comment from './forum-comment';
import Navbar from './navbar';
import './forum-home.css';
import Form from './forum-form';
import { useCookies } from 'react-cookie';
import Footer from './footer';
var FontAwesome = require('react-fontawesome');


function Forum(){

    const [posts, setPosts] = useState([]);
    const [showComment, setShowComment] = useState(null);
    const [showNewPost, setShowNewPost] = useState(false);
    const [user, setUser] = useState();
    const [token, setToken] = useCookies(['mr-token']);

     useEffect(()=>{
         
        fetch('http://127.0.0.1:8000/api/forum-post/', {
            method: 'GET',
            headers: {
              'Authorization': `Token ${token['mr-token']}`
            }
          }).then( resp => resp.json())
          .then( res => {
              setPosts(res);
            })
          .catch( error => console.log(error));

          fetch('http://127.0.0.1:8000/api/user-from-token/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token['mr-token']}`,
            },
            body: JSON.stringify({
                'token': `${token['mr-token']}`,
            })
            }).then( resp => resp.json()).then(res => setUser(res))
            .catch( error => console.log(error));
          
    }, []);
    
    const toggleComment = id =>{

        if(showComment===id) setShowComment(null);
        else setShowComment(id);
    }
    const newPostToggle = () =>{
        setShowNewPost(true);
    }
    const cancelClicked = () =>{
        setShowNewPost(false);
    }
    const addPost = post =>{
        setPosts([post, ...posts]);
    }
    return (
        <div>
            <Navbar/>
            
            <div className="jumbotron text-center" style={{background:'#dbdbdb'},{marginTop:'95px'}}>
                <h1 className="jumbotron-heading-top">SoChem Forum</h1>
            </div>
            
            <div className="container">

                <div className="row">
                    <div className="col-md-4 col-0 pt-1">
                        {showNewPost ? null : <div id = "a" onClick={newPostToggle}><span>Add New Post</span>
                        <div id = "liquid"></div></div>}
                        {showNewPost ? <Form cancelClicked={cancelClicked} addPost={addPost}/> : null}
                        <hr></hr>
                    </div>
                    <div className="col-md-8 col-12 body-font">
                        {posts.length===0 ? <h1 style={{marginTop:300, marginLeft:150}}>No post to show :(</h1> : null}
                        {posts.map((post, index) => {
                            return (
                                <div className="border mt-4 rounded p-2" key={post.id}>
                                    <div className="jumbotron p-2 mb-1 mt-1" id="heading-forum-post">
                                        <h3 className="text-light">{post.heading}</h3>
                                        <span className="text-light"><FontAwesome name="user"/> {user && post.author_name}</span>
                                        <span className="ml-5 text-light"><FontAwesome name="clock"/>{post.time}   {post.date}</span>
                                    </div>
                                    <h4 className="jumbotron p-2 mb-2">
                                            {post.body}
                                    </h4>
                                    <span className="mb-5">
                                    <h3 className="text-warning" onClick={()=>toggleComment(post.id)}><FontAwesome name="comment"/>
                                    <span className="ml-2 text-dark">{showComment==post.id ? <FontAwesome name="arrow-up"/> : <FontAwesome name="arrow-down"/>}</span>
                                    </h3>
                                    
                                    {showComment==post.id ? <Comment postId={post.id} user={user} allowAdd={true}/> : null}
                                    </span>
                                    
                                </div>   
                            );
                        })}
                        
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
        

    );
}

export default Forum;

