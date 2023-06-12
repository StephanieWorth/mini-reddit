import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSubreddits } from "./SubredditSlice";
import { setCurrentSubreddit } from "../Reddit/RedditSlice";
import './Subreddit.css';

const SubReddit = () => {
    const subreddits = useSelector(state => state.subreddit.subreddits);
    const currentSubreddit = useSelector(state => state.reddit.currentSubreddit);
    const isLoading = useSelector(state => state.subreddit.isLoading);
    const hasError = useSelector(state => state.subreddit.hasError);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchSubreddits())
    }, [dispatch])


    return (
        <div className="subreddit-container">
            <h2 className="subreddit-title">subreddits</h2>
            <ul className="subreddit-list">
                {subreddits.map((subreddit) => (
                    <li key={subreddit.id}
                        className={`${currentSubreddit === subreddit.url && `selected-subreddit`}`}
                    >
                        <button 
                            className={subreddit.display_name === currentSubreddit ? 'current-subreddit' : 'subreddit-items'}
                            type="button"
                            onClick={() => dispatch(setCurrentSubreddit(subreddit.display_name))}
                        >
                            <img
                                src={subreddit.icon_img || `https://www.redditinc.com/assets/images/site/reddit-logo.png`}
                                alt={`${subreddit.display_name}`}
                                className="subreddit-icon"
                            />
                            {subreddit.display_name}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )

};

export default SubReddit;