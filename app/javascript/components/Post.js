import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import PostNotFound from './PostNotFound';


const Post = ({ post, onDelete }) => {
  if (!post) return <PostNotFound />;

  return(

    <div className="postContainer">
      <h2>
        {post.title}
        <br />
        {post.description}
        <Link to={`/posts/${post.id}/edit`}>Edit</Link>
        <button className="delete" type="button" onClick={() => onDelete(post.id)}>
            Delete
        </button>
      </h2>
      <img className="object-image responsive" src={post.image} alt="" />
      <br />

    </div>
  );
};

Post.propTypes = {
  post: PropTypes.shape(),
  onDelete: PropTypes.func.isRequired,
};

Post.defaultProps = {
  post: undefined,
};

export default Post;
