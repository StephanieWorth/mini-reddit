import React, { useState} from "react";
import { useSelector } from "react-redux";
import './Card.css';
import moment from 'moment';
import { FaReddit } from 'react-icons/fa';
import { 
    TiArrowUpOutline,
    TiArrowUpThick,
    TiArrowDownOutline,
    TiArrowDownThick,
    TiMessage
} from 'react-icons/ti';
import { Comments } from "../Comments/Comments";






export const Card = ({post}) => {
  const currentSubreddit = useSelector(state => state.reddit.currentSubreddit)
  const [voteValue, setVoteValue] = useState(0);
  const [comments, setComments] = useState(null);
  
 

  const onHandleVote = (newValue) => {
    if (newValue === voteValue) {
        setVoteValue(0);
    } else if (newValue === 1) {
        setVoteValue(1);
    } else {
        setVoteValue(-1);
    }
  };

  const renderUpVote = () => {
    if (voteValue === 1) {
        return <TiArrowUpThick className="icon-action" />;
    }
    return <TiArrowUpOutline className="icon-action" />;
  };

  const renderDownVote = () => {
    if (voteValue === -1) {
        return <TiArrowDownThick className="icon-action" />;
    }
    return <TiArrowDownOutline className="icon-action" />;
  };

  const getVoteType = () => {
    if (voteValue === 1) {
        return 'up-vote';
    } if (voteValue === -1) {
        return 'down-vote'
    }
    return '';
  };


  //Comments
  const onToggleCommments =
        async (id) => {
        const response = await fetch(
            `https://www.reddit.com/comments/${id}.json`
        );
        const jsonResponse = await response.json();
        const comments = jsonResponse[1].data.children.map(comment=> comment.data)
        setComments(comments);
        console.log(comments)
      };

    const onClear=()=>{
        setComments(null)
    };
  
  
  return (

      <article className="article-container">

        <div className="post-votes-container">
            <button
                type="button"
                className="{`icon-action-button up-vote` ${voteValue === 1 && 'active}`}"
                onClick={() => onHandleVote(1)}
                aria-label="Up vote" 
            >
                {renderUpVote()}
            </button>
            <p className={`post-votes-value ${getVoteType()}`}>
                {post.ups}
            </p>
            <button
                type="button"
                className="{`icon-action-button down-vote` ${voteValue === -1 && 'active}`}"
                onClick={() => onHandleVote(-1)}
                aria-label="Down vote" 
            >
                {renderDownVote()}
            </button>
        </div>

        <div className="reddit-post">{/*flex-direction column */}
            <div className="subreddit-source">
                <div className="source-align-left">
                    <FaReddit className="logo-icon" />
                    <a className="subreddit-link">{post.subreddit}</a>
                    <p className="posted-by">Posted by: </p>
                    <span className="author-name">{post.author}</span>
                    <span className="timestamp">{moment.unix(post.created_utc).fromNow()}</span>
                </div>
            </div>
            <div className="post-title">
                {post.title}
            </div>
            <div className="post-image-container">
                <img src={post.url} alt='post image' className="post-image" />
            </div>

           

           <div className="comment-list">
                {comments ? <div><button onClick={()=>{onClear()}} className="clear-button"><img src="/close-icon.svg"/></button><Comments comments={comments}/></div> : <button 
                className="comments-button"
                 onClick={()=>onToggleCommments(post.id)}
                >Comments<div className="line-divide"> | </div> {post.num_comments}
                </button>}
           </div>
           

        </div>
        
      </article>
    
  );
};
  
export default Card;

