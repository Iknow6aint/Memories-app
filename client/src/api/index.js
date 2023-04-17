import axios from 'axios'

const API = axios.create({ baseURL: 'https://run-tnb3.onrender.com/' });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }

    return req;
});

export const fetchPost = (id) => API.get(`/posts/${id}`);
export const fetchPosts = () => API.get('/posts');
export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);
export const createPost = (newPost) => API.post('/posts/create', newPost);
export const likedPost = (id) => API.patch(`/posts/${id}/likepost`);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const comment = (value, id) => API.post(`/posts/${id}/commentPost`, { value });


export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);