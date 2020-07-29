/* eslint-disable no-useless-catch */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import './App.css';
import {
  getPostsAction,
  getPostAction,
  createPostAction
} from './actions/posts-action';
import Posts from './modules/Posts';

class App extends Component {
  componentDidMount() {
    const { getAllPosts } = this.props;
    getAllPosts();
  }

  render() {
    const { posts, getPost, createPost, getAllPosts } = this.props;
    return (
      <>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-info">Search</Button>
          </Form>
        </Navbar>
        <div className="container p-20">
          <Form
            ref={c => {
              this.form = c;
            }}
            className="m-b-20"
            method="POST"
            onSubmit={e => {
              e.preventDefault();
              const form = new FormData(e.target);
              const post = {
                userId: parseInt(form.get('userId'), 2),
                title: form.get('title'),
                body: form.get('description')
              };
              createPost(post);
              getAllPosts();
            }}
          >
            <Form.Group controlId="formBasicEmail">
              <Form.Label>User ID</Form.Label>
              <Form.Control
                name="userId"
                type="text"
                placeholder="Enter UserId"
              />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Title</Form.Label>
              <Form.Control
                name="title"
                type="text"
                placeholder="Enter Title"
              />
              <Form.Control
                name="title"
                type="text"
                placeholder="Enter Title"
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Description</Form.Label>
              <Form.Control
                name="description"
                type="text"
                placeholder="Enter Description"
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
          <Posts posts={posts} getPost={getPost} />
        </div>
      </>
    );
  }
}

App.propTypes = {
  posts: PropTypes.array,
  getPost: PropTypes.func,
  createPost: PropTypes.func,
  getAllPosts: PropTypes.func
};

const mapStateToProps = state => {
  return {
    posts: state.posts
  };
};

const mapActionToProps = dispatch => ({
  getAllPosts: () => {
    dispatch(getPostsAction());
  },
  getPost: id => {
    dispatch(getPostAction(id));
  },
  createPost: post => {
    dispatch(createPostAction(post));
  }
});

export default connect(mapStateToProps, mapActionToProps)(App);
