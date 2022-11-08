import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';

import useStyles from './styles';
import { createPost, updatePost } from '../../actions/posts';

// this form handles post creation and updates

const Form = ({ currentId, setCurrentId }) => {
  // state for post data
  const [postData, setPostData] = useState({ title: '', message: '', tags: '', selectedFile: '' });
  
  // whether user has selected a post
  const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null);
  
  const classes = useStyles();
  
  // keep user id
  const user = JSON.parse(localStorage.getItem('profile'));

  const dispatch = useDispatch();
  
  
  // if user selects a new post, show it in form
  useEffect(() => {
    if(post) setPostData(post);
  }, [post])

  // clear form data
  const clear = () => {
    setCurrentId(0); // might change back to null
    setPostData({ title: '', message: '', tags: '', selectedFile: '' });
  }
 
  // send form data to actions
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId === 0) { // create
      dispatch(createPost({ ...postData, name: user?.result?.name }));
      clear();
    } else { // update
      dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
      clear();
    }
  };


  // form if user is not logged in
  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          Please Sign In to Create Bookmarks.
        </Typography>
      </Paper>
    );
  }


  return (
    <Paper className={classes.paper}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
      <Typography variant="h6">{currentId ? 'Editing' : 'Creating'} a Bookmark</Typography>
      
      <TextField 
        name="title" 
        variant="outlined" 
        label="Title" 
        fullWidth 
        value={postData.title}
        onChange={(e) => setPostData({ ...postData, title: e.target.value })}
      />
      <TextField 
        name="message" 
        variant="outlined" 
        label="Link" 
        fullWidth 
        value={postData.message}
        onChange={(e) => setPostData({ ...postData, message: e.target.value })}
      />


      <Button 
        className={classes.buttonSubmit} 
        variant="contained" 
        color="primary" 
        size="large" 
        type="submit" 
        fullWidth>
          Submit
      </Button>

      <Button 
        variant="contained" 
        color="secondary" 
        size="small" 
        onClick={clear}
        fullWidth>
          Clear
      </Button>

      </form>
    </Paper>
  )
};

export default Form;