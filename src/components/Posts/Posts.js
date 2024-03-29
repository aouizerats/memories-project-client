import React, {useEffect} from "react";
import Post from "./Post/Post";
import useStyles from "./styles";
import {useDispatch, useSelector} from "react-redux";
import {fetchPosts} from "../postsSlice";
import {CircularProgress, Grid} from "@material-ui/core";

const Posts = () => {
    const classes = useStyles();
    const posts = useSelector((state) => state.posts.posts);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch])

    return (
       !posts.length ? <CircularProgress/> : (
           <Grid className={classes.mainContainer} container alignItems="stretch" spacing={3}>
               {posts.map((post) => (
                   <Grid key={post._id} item xs={12} sm={6} md={6}>
                       <Post post={post}/>
                   </Grid>
               ))}
           </Grid>
       )
    );
}

export default Posts;