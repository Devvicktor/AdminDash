import React, { useState } from "react";
import { Button, Container, Grid, Loader, Form } from "semantic-ui-react";

import { useMutation, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import PostCard from "../components/posts/postCard";

import { POST_QUERY } from "../graphql/postQuery";
import { Editor } from "@tinymce/tinymce-react";

export default function Post() {
  const [titleInput, setTitleInput] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [content, setContent] = useState("");

  const handleEditorChange = (content) => {
    setContent({content})
  };
  //fetch data from db
  const { loading, data } = useQuery(POST_QUERY);
  const [CreatePost] = useMutation(CREATE_POST, {
    update(cache, result) {
      setTitleInput("");setTagInput(""); setContent("");
      const data = cache.readQuery({
        query: POST_QUERY,
      });
      const newPost = result.data.createPost;
      cache.writeQuery({
        query: POST_QUERY,

        data: { getPosts: [newPost, ...data.getPosts] },
      });
    },
    variables: {
      title: titleInput,
      tag: tagInput,
      content,
    },
  });
  const posts = data && data.getPosts ? data.getPosts : null;
  console.log(posts);
  if (!posts) {
    return (
      <Loader active inline="centered">
        Loading
      </Loader>
    );
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    CreatePost();
  };

  return (
    <div style={{ margin: "2rem" }}>
      <Grid columns={4} divided stackable style={{ margin: "1em" }}>
        <Grid.Row>
          <Grid.Column width={6}>
            <Container>
              <Form noValidate className={loading ? "loading" : ""}>
                <Form.Field>
                  <Form.Input
                    name="title"
                    value={titleInput}
                    type="text"
                    label="Post-title"
                    placeholder="Ttle"
                    onChange={(e) => setTitleInput(e.target.value)}
                  />
                  <Form.Input
                    name="tag"
                    value={tagInput}
                    type="text"
                    label="Post-Tag"
                    placeholder="Post tag"
                    onChange={(e) => setTagInput(e.target.value)}
                  />{" "}
                  <Form.Field>
                    <Editor
                    textareaName='body'
                    value={content}
                      apiKey="5lj8z7py09g24pd8wjmbd68f3ypdfum99fbt50a51f9cwglv"
                      initialValue='Write a post body here'
                      init={{
                        height: 500,
                        menubar: true,
                        plugins: [
                          "advlist autolink lists link image charmap print preview anchor",
                          "searchreplace visualblocks code fullscreen",
                          "insertdatetime media table paste code help wordcount",
                        ],
                        toolbar:
                          "undo redo | formatselect | bold italic backcolor code | \
             alignleft aligncenter alignright alignjustify | \
             bullist numlist outdent indent | removeformat | help",
                      }}
                      onEditorChange={handleEditorChange}
                    />
                  </Form.Field>{" "}
                  {/* <Form.Input name="body" label="Post-Body" value={values.body}>
                    <RichTextEditor />
                  </Form.Input> */}
                </Form.Field>
                <Button color="teal" type="submit" onClick={handleSubmit}>
                  Submit
                </Button>
              </Form>
            </Container>
          </Grid.Column>
          <Grid.Column width={10}>
            <Grid columns={3} divided stackable>
              <Grid.Row>
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
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}
const CREATE_POST = gql`
  mutation createPost($body: String!, $title: String!, $tag: String!) {
    createPost(body: $body, title: $title, tag: $tag) {
      id
      title
      tag
      body
      createdAt
    }
  }
`;

