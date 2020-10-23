import React from "react";
import { Button, Card,Icon} from "semantic-ui-react";
import moment from 'moment'
import DeleteButton from "./deleteButton";

import { Link } from "react-router-dom";
export default function PostCard({
  post: { id, title, tag, body, createdAt }
}) {
  return (
    <div>
      <Card>
        <Card.Content>
          <Card.Header as={Link} to={`/posts/${id}`}>{title}</Card.Header>
          <Card.Meta>{moment(createdAt).format("LLLL")}</Card.Meta>
          <Card.Meta>{tag}</Card.Meta>
          <Card.Description>{body}</Card.Description>
        </Card.Content>
        <Card.Content extra>
         <Button as='div' color='teal' as={Link} to={`/Post-update/${id}`}><Icon name='edit'/></Button>
          <DeleteButton postId={id}/>
        </Card.Content>
      </Card>
    </div>
  );
}
