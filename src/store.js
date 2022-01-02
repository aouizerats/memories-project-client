import {configureStore} from "@reduxjs/toolkit";
import postsReducer from "./components/postsSlice";

export default configureStore({
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}),
    reducer: {
        posts: postsReducer
    }
});