
import "./Posts.css";
import React, { useState } from "react";
import Post from "./Post";
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { ListItem } from "@mui/material";
import BlogPosts from "./BlogPosts";

const Posts = () => {
    
    const [SearchQuery, setSearchQuery] = useState([]);

    const filtered = BlogPosts.filter(entry => Object.values(entry).some(val => typeof val === "string" && val.toLowerCase().includes(SearchQuery)));


return (
	<div id="posts">
        
        <Grid container spacing={12}>
        <Grid xs={12} md={12}>
                <ListItem>
                    <h1>Available subjects for tutoring.</h1>
                </ListItem>
                <ListItem>
                    Below id the list of subjects that we can focus on.
                        Search using the search bar...
                </ListItem>
                <ListItem>
                    <div>

                        <input
                            type="search"
                            name="search-form"
                            id="search-form"
                            className={"search"}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search..."
                        />

                    </div>
                </ListItem>
            </Grid>
        </Grid>

        <br />|<br />
        <Grid container spacing={12}>
            {filtered.map((post, index) => (

                <Grid xs={12} md={4} key={"grid" + index} index={"grid" + index}>
                    <ListItem><Post post={post} key={"item" + index} index={"item" + index} /></ListItem>
                </Grid>
                    
            ))}
        </Grid>
            
	</div>
    );
};

export default Posts;
