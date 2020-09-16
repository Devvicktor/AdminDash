import React from "react";
import { Card } from "semantic-ui-react";
import moment from "moment";
import { Link } from "react-router-dom";

export default function ContactCard({
  contact: { firstName, lastName, email, subject, createdAt, id },
}) {
  return (
    <Card as={Link} to={`/contact/${id}`}>
      <Card.Content>
        <Card.Header>{subject}</Card.Header>
        <Card.Meta>{firstName + "  " + lastName}</Card.Meta>
        <Card.Meta>{moment(createdAt).format("LLLL")}</Card.Meta>
        <Card.Meta>{email}</Card.Meta>
        {/* <Card.Description>{body}</Card.Description> */}
      </Card.Content>
    </Card>
  );
}
