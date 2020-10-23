import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import {
  Grid,
  Loader,
  Container,
  Header,
  Image,
  Comment,
  Segment,
  Icon,
  Form,
  Button,
  TextArea,
} from "semantic-ui-react";
import gql from "graphql-tag";
import web from "../Assets/img/web.png";
import moment from "moment";

import { Link } from "react-router-dom";
import DeleteButton from "../components/posts/deleteButton";

function SinglePost(props) {
  //get postId from the url
  const postId = props.match.params.postId;

  const [namesInput, setNamesInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [commentInput, setCommentInput] = useState("");

  const { loading, data } = useQuery(FETCH_POST, {
    variables: { postId },
  });
  const [postComment] = useMutation(COMMENTONPOST_MUTATION, {
    update() {
      setCommentInput("");
      setEmailInput("");
      setNamesInput("");
    },

    variables: {
      postId,
      body: commentInput,
      email: emailInput,
      names: namesInput,
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

  const { id, title, body, tag, comments, createdAt } = post;
  const WebShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "",
          text: { body },
          uri: {},
        })
        .then(() => alert("Share was successful"))
        .catch((error) => alert("Error sharing"));
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    postComment();
  };

  return (
    <Container>
      <Header as="h3" dividing>
        {title}
      </Header>
      <div>
        <Image src={web} alt={tag} />
      </div>

      <Container>
        <Header.Subheader>{moment(createdAt).format("LLLL")}</Header.Subheader>
        <Header.Subheader>{tag}</Header.Subheader>
        <Segment>
          
          {body}
        </Segment>
      </Container>

      <Icon circular name="share alternate" color="teal" onClick={WebShare} />

      <DeleteButton postId={id} />

      <Container style={{ marginTop: 20 }}>
        <Header as="h2" dividing>
          Create Comment..
        </Header>
        <Form noValidate className={loading ? "loading" : ""}>
          <Form.Input
            name="names"
            type="text"
            label="Full Names"
            value={namesInput}
            placeholder="Full Names..."
            onChange={(event) => setNamesInput(event.target.value)}
          />
          <Form.Input
            name="email"
            type="text"
            label="Email"
            value={emailInput}
            placeholder="Email.."
             onChange={(event) => setEmailInput(event.target.value)}
          />

          <Form.Input
            name="comment"
            type="text"
            label="Comment"
            control={TextArea}
            value={commentInput}
            placeholder="Comment here..."
            onChange={(event) => setCommentInput(event.target.value)}
          />
          <Button
            type="submit"
            color="teal"
            disabled={
              commentInput.trim() === "" ||
              emailInput.trim() === "" ||
              namesInput.trim() === ""
            }
            onClick={handleSubmit}
          >
            Comment
          </Button>
        </Form>
      </Container>

      <Container style={{ marginTop: 20 }}>
        <Comment.Group size="small">
          <Header as="h2" dividing>
            Comments
          </Header>
          {comments.map((comment) => (
            <Comment key={comment.id}>
              <Comment.Avatar as={Link} src={<Icon name="user" />} />
              <Comment.Content>
                <Comment.Author as="a">{comment.names}</Comment.Author>
                <Comment.Metadata>
                  <span>{moment(comment.createdAt).format("LLLL")}</span>
                  <span>{comment.email}</span>
                </Comment.Metadata>
                <Comment.Text>{comment.body}</Comment.Text>
                <Comment.Actions>
                  <Link to={"/"}>Reply</Link>
                </Comment.Actions>
              </Comment.Content>
            </Comment>
          ))}
        </Comment.Group>
      </Container>
    </Container>
  );
}

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
const COMMENTONPOST_MUTATION = gql`
  mutation CommentOnPost(
    $postId: ID!
    $names: String!
    $email: String!
    $body: String!
  ) {
    CommentOnPost(postId: $postId, body: $body, email: $email, names: $names) {
      id
      comments {
        id
        names
        email
        body
        createdAt
      }
    }
  }
`;

export default SinglePost;
