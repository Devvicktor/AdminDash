import gql from 'graphql-tag'
export const POST_QUERY=gql`
 query getPosts{
    getPosts {
      id
      tag
      title
      body
      createdAt
    }
  }
`