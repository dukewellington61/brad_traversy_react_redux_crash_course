import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchPosts } from "../actions/postActions";

class Posts extends Component {
  componentDidMount() {
    this.props.fetchPosts();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.newPost) {
      this.props.posts.unshift(nextProps.newPost);
    }
  }

  render() {
    const postItems = this.props.posts.map((post) => (
      <div key={post.id}>
        <h3>{post.title}</h3>
        <p>{post.body}</p>
      </div>
    ));
    return (
      <div>
        <h1>Posts</h1>
        {postItems}
      </div>
    );
  }
}

Posts.propTypes = {
  fetchPosts: PropTypes.func.isRequired,
  posts: PropTypes.array.isRequired,
  newPost: PropTypes.object,
};

// mapStateToProps is used to access redux state in the component
// it takes the state object as argument which can be used to retrieve it's properties
// it maps these properties to object keys (which are props) which will then be rendered in JSX

const mapStateToProps = (state) => ({
  posts: state.posts.items,
  newPost: state.posts.item,
});

// connect function connects Posts component to the redux store
// mapStateToProps: state from redux store is maped to our component props
// apart from whatever props Posts component was receiving, it will now recieve an additional prob called
// posts which reflects the posts in the redux store
export default connect(mapStateToProps, { fetchPosts })(Posts);
