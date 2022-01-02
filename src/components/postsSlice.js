import axios from "axios";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const url = "https://aouizerats-memories-project.herokuapp.com/posts";

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await axios.get(url);
    return response.data;
});

export const addPost = createAsyncThunk('posts/addPost', async (newPost) => {
    const response = await axios.post(url, newPost);
    return response.data;
});

export const updatePost = createAsyncThunk('posts/updatePost', async ({id, post}) => {
    const response = await axios.patch(`${url}/${id}`, post);
    return response.data;
});

export const deletePost = createAsyncThunk('post/deletePost', async (id) => {
    await axios.delete(`${url}/${id}`);
    return id;
});

export const likePost = createAsyncThunk('post/likePost', async (id) => {
    const response = await axios.patch(`${url}/${id}/likePost`);
    return response.data;
});

export const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        posts: [],
        selectedPost: null
    },
    reducers: {
        setSelectedPost: (state, action) => {
            state.selectedPost = action.payload;
        }
    },
    extraReducers: {
        [fetchPosts.fulfilled]: (state, action) => {
            state.status = 'succeeded';
            state.posts = action.payload;
        },
        [addPost.fulfilled]: (state, action) => {
            state.posts = [...state.posts, action.payload];
        },
        [deletePost.fulfilled]: (state, action) => {
            state.posts = state.posts.filter((post) => post._id !== action.payload);
        },
        [updatePost.fulfilled]: (state, action) => {
            state.posts = state.posts.map((post) => post._id === action.payload._id ? action.payload : post);
        },
        [likePost.fulfilled]: (state, action) => {
            state.posts = state.posts.map((post) => post._id === action.payload._id ? action.payload : post);
        }
    }
});

export const {setSelectedPost} = postsSlice.actions;

export default postsSlice.reducer;