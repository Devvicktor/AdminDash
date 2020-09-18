import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import {  Grid, Loader } from "semantic-ui-react";
import ContactCard from "../components/contactCard";
export default function Contact() {
  const { loading, data } = useQuery(CONTACT_QUERY);
  const contacts = data && data.getMessages ? data.getMessages : null;

  if (!contacts) {
    return (
      <Loader active inline="centered">
        Loading Posts...
      </Loader>
    );
  }
  return (
    <div style={{margin:'2rem'}}>
        <Grid columns={4} divided stackable>
            <Grid.Row>
                <Grid.Column></Grid.Column>
                {loading ? (
        <Loader active inline="centered">
          Loading Posts...
        </Loader>
      ) : (
        contacts &&
        contacts.map((contact) => (
          <Grid.Column key={contact.id} style={{ marginBottom: 20 }}>
            <ContactCard contact={contact} />
          </Grid.Column>
        ))
      )}

            </Grid.Row>
        </Grid>

    </div>
  );
}
const CONTACT_QUERY = gql`
  query {
    getMessages {
      id
      firstName
      lastName
      email
      subject
      body
      contactedAt
    }
  }
`;
