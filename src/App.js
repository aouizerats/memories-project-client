import React from "react";
import {AppBar, Container, Grid, Grow, Typography} from "@material-ui/core";

import Posts from "./components/Posts/Posts";
import Form from "./components/Form/Form";
import memories from './images/memories.png';
import useStyles from "./styles";

const App = () => {
    const classes = useStyles();

    return (
        <Container maxWidth="lg">
            <AppBar className={classes.appBar} position="static" color="inherit">
                <Typography className={classes.heading} variant="h2" align="center"> Memories</Typography>
                <img className={classes.image} src={memories} alt="memories" height="60"/>
            </AppBar>
            <Grow in>
                <Grid className={classes.mainContainer} container justifyContent="space-between" alignItems="stretch" spacing={3}>
                    <Grid item xs={12} sm={7}>
                        <Posts/>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Form/>
                    </Grid>
                </Grid>
            </Grow>
        </Container>
    );
}

export default App;