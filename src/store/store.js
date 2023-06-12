import { configureStore } from '@reduxjs/toolkit'; //configureStore automatically adds several middleware to the store setup by default
import redditReducer from '../features/Reddit/RedditSlice';
import subredditReducer from '../features/Subreddit/SubredditSlice';


export default configureStore({
    reducer: {
        reddit: redditReducer,
        subreddit: subredditReducer        
    },
});