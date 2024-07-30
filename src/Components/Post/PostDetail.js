import React from "react";


const PostDetail = ({ post: { title, body,
    imgUrl, author }, index }) => {
    return (
        <div className="post-container">
            <h1 className="heading">
                {title}
            </h1>
            <img className="image" src={imgUrl} alt="post" />
            <p>{body}</p>
            <div className="info">	
                <h4>Written by: {author}</h4>
            </div>
        </div>
    );
};
export default PostDetail;
