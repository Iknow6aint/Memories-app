import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Post from './Post/Post'
import useStyles from './styles'
import { Grid, CircularProgress } from '@material-ui/core'
const Posts = ({ setCurrentId }) => {
    const classes = useStyles();
    const posts = useSelector((state) => state.posts);
    console.log(posts);
    return (
        !posts?.length ? <CircularProgress /> : (
            <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                {posts.map((post) => (
                    <Grid key={post._id} item xs={12} sm={6} md={6} lg={12}>
                        <Post post={post} setCurrentId={setCurrentId} />
                    </Grid>
                ))}
            </Grid>
        )
    )
}

export default Posts