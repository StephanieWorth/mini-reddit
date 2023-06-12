import React from "react";
import moment from "moment";
import './Comments.css'

export const Comment = ({comment}) => {
    
    return (
        <div className="comment">
            <div className="comment-details">
                <p className="comment-author">{comment.author}</p>
                <p className="comment-created">{moment.unix(comment.created_utc).fromNow()}</p>
            </div>
            <div className="comment-body">{comment.body}</div>
        </div>
    )
}