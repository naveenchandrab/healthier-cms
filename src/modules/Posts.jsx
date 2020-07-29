import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';

const Posts = ({ posts, getPost }) => (
  <Table striped bordered hover>
    <thead>
      <tr>
        <th>User ID</th>
        <th>Title</th>
      </tr>
    </thead>
    <tbody>
      {posts.map(post => (
        <tr
          key={post.id}
          onClick={() => {
            getPost(post.id);
          }}
        >
          <td>{post.id}</td>
          <td>{post.title}</td>
        </tr>
      ))}
    </tbody>
  </Table>
);

Posts.propTypes = {
  posts: PropTypes.array,
  getPost: PropTypes.func
};

export default Posts;
