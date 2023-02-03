import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { getPosts } from '../../actions/posts';
import { Container, AppBar, Typography, Grow, Grid, Paper } from '@material-ui/core';
import Posts from '../Posts/Posts'
import Form from "../Forms/Form"
import Pagination from '../Pagination'
import useStyles from './styles';
import { useHistory, useLocation } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input'


// usequery function
function useQuery() {
    return new URLSearchParams(useLocation().search);
}
const Home = () => {
    //page query
    const query = useQuery();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');

    const [currentId, setCurrentId] = useState(0);
    const dispatch = useDispatch();

    //search
    const [search, setSearch] = useState('');
    const [tags, setTags] = useState([]);
    const history = useHistory();

    const classes = useStyles()


    useEffect(() => {
        dispatch(getPosts())
    }, [dispatch, currentId])
    return (
        <Grow in>
            <Container>
                <Grid container direction="column-reverse" justifyContent="space-between" alignItems="stretch" spacing={3}>
                    <Grid item xs={12} sm={7}>
                        <Posts setCurrentId={setCurrentId} />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Form currentId={currentId} setCurrentId={setCurrentId} />
                        <Paper className={classes.pagination} elevation={6}>
                            <Pagination />
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
}

export default Home