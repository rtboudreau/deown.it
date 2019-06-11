import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Switch } from 'react-router-dom';
import Post from './Post';
import PostForm from './PostForm';
import PostList from './PostList';
import Header from './Header';
import PropsRoute from './PropsRoute';
import { success } from '../helpers/notifications';
import { handleAjaxError } from '../helpers/helpers';


class Feed extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: null,
    };
    this.addPost = this.addPost.bind(this);
    this.updatePost = this.updatePost.bind(this);
    this.deletePost = this.deletePost.bind(this);
  }

  componentDidMount() {
    axios
      .get('/api/posts.json')
      .then(response => this.setState({ posts: response.data }))
      .catch(handleAjaxError);
  }

  addPost(newPost) {
    axios
      .post('/api/posts.json', newPost)
      .then((response) => {
        success('Post Created!');
        const savedPost = response.data;
        this.setState(prevState => ({
          posts: [...prevState.posts, savedPost],
        }));
        const { history } = this.props;
        history.push(`/posts/${savedPost.id}`);
      })
      .catch(handleAjaxError);
  }

  updatePost(updatedPost) {
    axios
      .put(`/api/posts/${updatedPost.id}.json`, updatedPost)
      .then(() => {
        success('Post updated');
        const { posts } = this.state;
        const idx = posts.findIndex(post => post.id === updatedPost.id);
        posts[idx] = updatedPost;
        const { history } = this.props;
        history.push(`/posts/${updatedPost.id}`);
        this.setState({ posts });
      })
      .catch(handleAjaxError);
  }

  deletePost(postId) {
    const sure = window.confirm('Are you sure?');
    if (sure) {
      axios
        .delete(`/api/posts/${postId}.json`)
        .then((response) => {
          if (response.status === 204) {
            success('Post deleted');
            const { history } = this.props;
            history.push('/posts');

            const { posts } = this.state;
            this.setState({ posts: posts.filter(post => post.id !== postId) });
          }
        })
        .catch(handleAjaxError);
    }
  }

  render() {
    const { posts } = this.state;
    if (posts === null) return null;

    const { match } = this.props;
    const postId = match.params.id;
    const post = posts.find(e => e.id === Number(postId));

    return (
      <div>
        <Header />
        <div className="grid">

          <Switch>
            <PropsRoute
              path="/posts/new"
              component={PostForm}
              onSubmit={this.addPost}
            />

            <PropsRoute
              exact
              path="/posts/:id/edit"
              component={PostForm}
              post={post}
              onSubmit={this.updatePost}
            />

            <PropsRoute
              path="/posts/:id"
              component={Post}
              post={post}
              onDelete={this.deletePost}
            />

          </Switch>
          <PostList posts={posts} activeId={Number(postId)} />
        </div>
      </div>
    );
  }
}

Feed.propTypes = {
  match: PropTypes.shape(),
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};

Feed.defaultProps = {
  match: undefined,
};

export default Feed;
