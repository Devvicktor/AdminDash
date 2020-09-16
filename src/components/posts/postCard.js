import React from "react";
import { Card } from "semantic-ui-react";
import moment from 'moment'
export default function PostCard({
  post: { id, title, tag, body, createdAt }
}) {
  return (
    <div>
      <Card>
        <Card.Content>
          <Card.Header>{title}</Card.Header>
          <Card.Meta>{moment(createdAt).format("LLLL")}</Card.Meta>
          <Card.Meta>{tag}</Card.Meta>
          <Card.Description>{body}</Card.Description>
        </Card.Content>
      </Card>
    </div>
  );
}
