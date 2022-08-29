
import axios from 'axios';

//const API = axios.create({ baseURL: 'http://localhost:5000' });

//const API = axios.create({ baseURL: 'https://kmanikonmemories.com' });

const API = axios.create({ baseURL: 'https://5doiyzdfl4.execute-api.us-east-2.amazonaws.com/' });

// authorization to apply middleware
// send token to backend middleware
API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
  
    return req;
});

// posts-related requests

export const fetchPosts = () => API.get('/posts');
export const createPost = (newPost) => API.post('/posts', newPost);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);


// auth-related requests
export const signIn = (formData) => API.post('/users/signin', formData);
export const signUp = (formData) => API.post('/users/signup', formData);