import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSubredditPosts } from "./RedditSlice";
import Card from "../Card/Card";
import './Reddit.css';


const Reddit = () => {
    const posts = useSelector(state => state.reddit.posts);
    const currentSubreddit = useSelector(state => state.reddit.currentSubreddit);
    //const isLoading = useSelector(state => state.reddit.isLoading);
    //const hasError = useSelector(state => state.reddit.hasError);
    

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchSubredditPosts(currentSubreddit))
    }, [currentSubreddit]);
    //console.log(posts)

   

      
    

    /*if (isLoading) {
        return <h1>Loading...</h1>
    } if (hasError) {
        return <h1>Try Again</h1>
    }*/

 
    
    return (
        <div className="reddit-posts-container">
             <h2 className="current-subreddit-title">{currentSubreddit}</h2>
             <div>
                {posts ? <>{posts.map((post) => {
                    return <Card 
                                key={post.id}
                                post={post}
                                
                            />
                })}</> : <p>No Posts</p>}
             </div>
        </div>      
            
    )

}

export default Reddit;