import React from 'react';
import PropTypes from 'prop-types';
import { isEmptyObject, validatePost } from '../helpers/helpers';
import { Link } from 'react-router-dom';
import PostNotFound from './PostNotFound';

class PostForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      post: props.post,
      errors: {},
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { post } = this.state;
    const errors = validatePost(post);

    if (!isEmptyObject(errors)) {
      this.setState({ errors });
    } else {
      const { onSubmit } = this.props;
      onSubmit(post);
    }
  }

  componentWillReceiveProps({ event }) {
    this.setState({ event });
  }

  handleInputChange(post) {
    const { target } = post;
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState(prevState => ({
      post: {
        ...prevState.post,
        [name]: value,
      },
    }));
  }

  renderErrors() {
    const { errors } = this.state;

    if (isEmptyObject(errors)) {
      return null;
    }

    return (
      <div className="errors">
        <h3>The following errors prohibited the post from being saved:</h3>
        <ul>
          {Object.values(errors).map(error => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      </div>
    );
  }

  render() {
    const { post } = this.state;
    const { path } = this.props;

    if (!post.id && path === '/posts/:id/edit') return <PostNotFound />;

    const cancelURL = post.id ? `/posts/${post.id}` : '/posts';
    const title = post.id ? `Edit ${post.title}` : 'New Post';


    return (
      <div>

        {this.renderErrors()}
        <form className="postForm" onSubmit={this.handleSubmit}>
        <h2>{ title }</h2>
          <div>
            <label htmlFor="title">
              <strong>Title:</strong><br />
              <input
                type="text"
                id="title"
                name="title"
                onChange={this.handleInputChange}
                value={post.title}
              />
            </label>
          </div>
          <div>
            <label htmlFor="description">
              <strong>Description:</strong><br />
              <textarea
                cols="30"
                rows="10"
                id="description"
                name="description"
                onChange={this.handleInputChange}
                value={post.description}
              />
            </label>
          </div>
          <div>
            <label htmlFor="image url">
              <strong>Image URL:</strong> <br />
              <input
                type="text"
                id="image"
                name="image"
                onChange={this.handleInputChange}
                value={post.image}
              />
            </label>
          </div>
          <div className="form-actions">
            <button type="submit">Save</button>
            <Link to={cancelURL}>Cancel</Link>
          </div>
        </form>
      </div>
    );
  }
}

PostForm.propTypes = {
  post: PropTypes.shape(),
  onSubmit: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
};

PostForm.defaultProps = {
  post: {
    title: '',
    description: '',
    image: '',
  },
};

export default PostForm;
