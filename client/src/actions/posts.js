import * as api from "../api"
import { CREATE, DELETE, END_LOADING, FETCH_ALL, FETCH_BY_SEARCH, START_LOADING, UPDATE, FETCH_POST, } from "../constants/actionType";
//action creators
export const getPost = (id) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })
        const { data } = await api.fetchPost(id);
        const action = { type: FETCH_POST, payload: data }
        dispatch(action);
        dispatch({ type: END_LOADING })
    } catch (error) {
        console.log(error.message);
    }

}
export const getPosts = () => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })
        const { data } = await api.fetchPosts();
        const action = { type: FETCH_ALL, payload: data }
        dispatch(action);
        dispatch({ type: END_LOADING })
    } catch (error) {
        console.log(error.message);
    }

}
//  get post by search 
export const getPostBySearch = (searchQuery) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })
        const { data: { data } } = await api.fetchPostsBySearch(searchQuery)
        const action = { type: FETCH_BY_SEARCH, payload: data }
        dispatch(action)
        dispatch({ type: END_LOADING })
    } catch (error) {
        console.log(error);
    }
}
export const createPost = (post, history) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })
        const { data } = await api.createPost(post);

        history.push(`/posts/${data._id}`);
        const action = { type: CREATE, payload: data }
        dispatch(action)
    } catch (error) {
        console.log(error);
    }
}


export const updatePost = (id, updatedPost) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(id, updatedPost);
        const action = { type: UPDATE, payload: data }
        dispatch(action)
    } catch (error) {
        console.log(error);
    }
}

export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id);
        const action = { type: DELETE, payload: id }
        dispatch(action)
    } catch (error) {
        console.log(error);

    }

}


export const likePost = (id) => async (dispatch) => {
    try {
        const { data } = await api.likedPost(id);

        dispatch({ type: UPDATE, payload: data });
    } catch (error) {
        console.log(error.message);
    }
};

export const commentPost = (value, id) => async (dispatch) => {
    try {
        const { data } = await api.comment(value, id);

        dispatch({ type: COMMENT, payload: data });

        return data.comments;
    } catch (error) {
        console.log(error);
    }
};