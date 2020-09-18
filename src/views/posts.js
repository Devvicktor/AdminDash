import React from "react";
import { Modal, Button, Container, Grid, Loader } from "semantic-ui-react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import PostCard from "../components/posts/postCard";
import CreateForm from "../components/posts/createForm";


export default function Post() {
  const [open, setOpen] = React.useState(false);
  const { loading, data } = useQuery(POST_QUERY);
  const posts = data && data.getPosts ? data.getPosts : null;
  console.log(posts);
  if (!posts) {
    return (
      <Loader active inline="centered">
        Loading
      </Loader>
    );
  }
  return (
    <div style={{margin:'2rem'}}>
      <Grid columns={4} divided stackable style={{ margin: "1em" }}>
        <Grid.Row>
          <Grid.Column>
            <Container>
              <Modal
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                trigger={<Button color="teal">Create New Post</Button>}
              >
                <Modal.Header>Create a Post</Modal.Header>
                <Modal.Content>
                  <CreateForm />

                </Modal.Content>
                <Modal.Actions>
                  <Button color="teal" onClick={() => setOpen(false)}>
                    Submit
                  </Button>
                </Modal.Actions>
              </Modal>
            </Container>
          </Grid.Column>

          {loading ? (
            <Loader active inline="centered">
              Loading posts ...
            </Loader>
          ) : (
            posts &&
            posts.map((post) => (
              <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                <PostCard post={post} />
              </Grid.Column>
            ))
          )}
        </Grid.Row>
      </Grid>
    </div>
  );
}
const POST_QUERY = gql`
  query {
    getPosts {
      id
      tag
      title
      body
      createdAt
    }
  }
`;
