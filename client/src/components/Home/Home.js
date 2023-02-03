import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { getPostBySearch, getPosts } from '../../actions/posts';
import { Container, AppBar, Typography, TextField, Grow, Grid, Paper, Button } from '@material-ui/core';
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

    // search tags
    const searchPost = () => {
        if (search.trim() || tags) {
            //dispatch acton
            dispatch(getPostBySearch({ search, tags: tags.join(',') }))
            history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
        } else (
            history.push('/')
        )
    }

    // handle tags
    const handleAddChip = (tag) => setTags([...tags, tag]);

    const handleDeleteChip = (deletedTag) => {
        setTags(tags.filter((tag) => tag !== deletedTag))
    }

    //keyPress for enter
    const handleKeyPress = (e) => {
        if (e.keyCode === 13) {
            //search post
            searchPost()
        }
    }
    useEffect(() => {
        dispatch(getPosts())
    }, [dispatch, currentId])
    return (
        <Grow in>
            <Container maxWidth='xl'>
                <Grid container direction="column-reverse" justifyContent="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
                    <Grid item xs={12} sm={6} md={9}>
                        <Posts setCurrentId={setCurrentId} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <AppBar className={classes.appBarSearch} position="static" color="inherit">
                            <TextField onKeyDown={handleKeyPress} name="search" variant="outlined" label="Search Memories" fullWidth value={search} onChange={(e) => setSearch(e.target.value)} />
                            <ChipInput
                                style={{ margin: '10px 0' }}
                                value={tags}
                                onAdd={(chip) => handleAddChip(chip)}
                                onDelete={(chip) => handleDeleteChip(chip)}
                                label="Search Tags"
                                variant="outlined"
                            />
                            <Button onClick={searchPost} className={classes.searchButton} variant="contained" color="primary">Search</Button>
                        </AppBar>
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