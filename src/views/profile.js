import React from 'react'
import { Container,Header, Image, Segment } from 'semantic-ui-react'
import vic from '../Assets/img/victor.jpg'
export default function Profile() {
    return (
    <Container>
        <Header>MY Profile</Header>
        <Image src={vic} size='medium' circular/>
        <Segment>
            <Header>About Me</Header>
            <p>  I am a Full stack developer with experience building web applications
          and designs. I have rooted myself in Javascript, going about the
          MERN(MongoDB, Express, ReactJs, NodeJs ) stack.</p>
        </Segment>
        <Segment>
            <Header>Tech Stack</Header>
            My skills hee
        </Segment>
        <Segment>
            <Header>
                Manage Resume
            </Header>
        </Segment>
        <Segment>
            <Header>Other Profiles</Header>
        </Segment>

    </Container>
    )
}
