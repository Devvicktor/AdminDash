import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";
import {
  Button,
  Loader,
  Form,
  TextArea,
  Container,
  Segment,
} from "semantic-ui-react";
import gql from "graphql-tag";

export default function UpdatePost(props) {
  const postId = props.match.params.postId;

  const [values, setValues] = useState({
    title: "",
    tag: "",
    body: "",
  });
  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };
  const { loading, data } = useQuery(FETCH_POST, {
    variables: {
      postId,
    },
  });
  const [UpdatePost] = useMutation(UPDATE_POST, {
    update() {},
    variables: {
      postId,
      title:input.value
    },
  });

  const post = data && data.getPost ? data.getPost : null;
  if (!post) {
    return (
      <Loader active inline="centered" color="teal">
        Loading Post...
      </Loader>
    );
  }
  if (loading) {
    return (
      <Loader active inline="centered">
        Loading Post...
      </Loader>
    );
  }

  const { title, body, tag } = post;

  const handleSubmit = (e) => {
    e.preventDefault();
    UpdatePost();
  };
  let input;

  return (
    <Container>
      <Segment>
  <p>{title}</p>
        {" "}
        <Form novalidate className={loading ? "loading" : ""}>
          <Form.Field>
            <Form.Input
              name="title"
              value={values.title}
              type="text"
              label="Post-title"
              placeholder="Title"
              onChange={handleChange}
              ref={node => {
                input = node;
              }}
            />
            <Form.Input
              name="tag"
              value={values.tag}
              type="text"
              label="Post-Tag"
              placeholder="Post tag"
              onChange={handleChange}
            />
            <TextArea
              name="body"
              value={values.body}
              type="text"
              label="Post-Body"
              placeholder="Post body"
              onChange={handleChange}
            />
          </Form.Field>
          <Button color="teal" onClick={handleSubmit}>
            Update
          </Button>
        </Form>
      </Segment>
    </Container>
  );
}
const UPDATE_POST = gql`
  mutation updatePost(
    $postId: ID!
    $tag: String!
    $title: Sting!
    $body: Sting!
  ) {
    updatePost(postId: $postId, tag: $tag, title: $title, body: $body) {
      id
      tag
      title
      body
      createdAt
    }
  }
`;
const FETCH_POST = gql`
  query FETCHPOST($postId: ID!) {
    getPost(postId: $postId) {
      id
      title
      tag
      body
      comments {
        id
        names
        email
        body
        createdAt
      }
      createdAt
    }
  }
`;
