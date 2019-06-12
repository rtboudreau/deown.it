import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import TextTruncate from 'react-text-truncate';

class PostList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
    };

      this.searchInput = React.createRef();
      this.updateSearchTerm = this.updateSearchTerm.bind(this);
    }

    updateSearchTerm() {
      this.setState({ searchTerm: this.searchInput.current.value });
    }

    matchSearchTerm(obj) {
      const {
        id, published, created_at, updated_at, ...rest
      } = obj;
      const { searchTerm } = this.state;

      return Object.values(rest).some(
        value => value.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1,
      );
    }

  renderPosts() {
    const { activeId, posts } = this.props;
    const filteredPosts = posts
      .filter(el => this.matchSearchTerm(el))
      .sort((a, b) => new Date(b.event_date) - new Date(a.event_date));

  return filteredPosts.map(post => (

      <li key={post.id}>
        <Link to={`/posts/${post.id}`} className={activeId === post.id ? 'active' : ''}>
          <div className="feed-grid">
            <div className="feed-copy">
              <h3>
                {post.id}
              </h3>
              <h2>
                {post.title} | {post.method}
              </h2>
              <TextTruncate
                  line={2}
                  truncateText="…[Read More]"
                  text={post.description}
              />
              {post.created_at}
            </div>
            <div className="feed-image">
              <img className="object-image responsive" src={post.image} alt="" />
            </div>

          </div>
        </Link>
      </li>

    ));
  }

  render() {
    return (
      <section className="postList">
        <h2>
        User's Name
        <Link to="/posts/new">New Post</Link>
        </h2>

        <input
          className="search"
          placeholder="Search"
          type="text"
          ref={this.searchInput}
          onKeyUp={this.updateSearchTerm}
        />

        <ol reversed>{this.renderPosts()}</ol>
      </section>
    );
  }
}

PostList.propTypes = {
  activeId: PropTypes.number,
  events: PropTypes.arrayOf(PropTypes.object),
};

PostList.defaultProps = {
  activeId: undefined,
  posts: [],
};

export default PostList;
