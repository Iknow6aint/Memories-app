import { CREATE, DELETE, FETCH_ALL, UPDATE, FETCH_BY_SEARCH, LIKE } from "../constants/actionType";

export default (state = [], action) => {
    switch (action.type) {
        case FETCH_ALL:
            return {
                ...state,
                posts: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages
            }
        case FETCH_BY_SEARCH:
            return { ...state, posts: action.payload };
        case DELETE:
            return state.filter((post) => post._id !== action.payload)
        case CREATE:
            return [...state, action.payload];
        case LIKE:
        case UPDATE:
            return state.map((post) => post._id === action.payload._id ? action.payload : post)
        default:
            return state;
    }
}