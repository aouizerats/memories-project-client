import React, {useEffect, useState} from "react";
import useStyles from "./styles";
import {Button, Paper, TextField, Typography} from "@material-ui/core";
import FileBase from "react-file-base64";
import {useDispatch, useSelector} from "react-redux";
import {addPost, setSelectedPost, updatePost} from "../postsSlice";

const Form = () => {
    const classes = useStyles();
    const [postData, setPostData] = useState({creator: '', title: '', message: '', tags: '', selectedFile: ''});
    const selectedPost = useSelector((state) => state.posts.selectedPost);
    const dispatch = useDispatch();

    useEffect(() => {
        if (selectedPost) setPostData(selectedPost);
    }, [selectedPost]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (selectedPost && selectedPost._id) {
            dispatch(updatePost({id: selectedPost._id, post: postData}));
        } else {
            dispatch(addPost(postData));
        }
        clear();
    };

    const clear = () => {
        dispatch(setSelectedPost(null));
        setPostData({creator: '', title: '', message: '', tags: '', selectedFile: ''});
    };

    return (
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6">{selectedPost ? 'Editing' : 'Creating'} a Memory</Typography>
                <TextField name="creator" variant="outlined" label="Creator" fullWidth
                           value={postData.creator}
                           onChange={(e) => setPostData({...postData, creator: e.target.value})}/>
                <TextField name="title" variant="outlined" label="Title" fullWidth
                           value={postData.title}
                           onChange={(e) => setPostData({...postData, title: e.target.value})}/>
                <TextField name="message" variant="outlined" label="Message" fullWidth
                           value={postData.message}
                           onChange={(e) => setPostData({...postData, message: e.target.value})}/>
                <TextField name="tags" variant="outlined" label="Tags (coma separated)" fullWidth
                           value={postData.tags}
                           onChange={(e) => setPostData({...postData, tags: e.target.value.split(',')})}/>
                <div className={classes.fileInput}>
                    <FileBase type="file" multiple={false}
                              onDone={(base) => setPostData({...postData, selectedFile: base})}/>
                </div>
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit"
                        fullWidth>Submit</Button>
                <Button variant="contained" color="secondary" size="small" fullWidth onClick={clear}>Clear</Button>
            </form>
        </Paper>
    );
}

export default Form;