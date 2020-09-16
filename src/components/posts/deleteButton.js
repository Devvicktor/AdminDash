import React from 'react'
import {useMutation} from '@apollo/react-hooks'
import gql from 'graphql-tag'
export default function deleteButton() {
    return (
        <div>
            <Button>DeletePost</Button>
        </div>
    )
}
const DELETE_POST=gql`
mutation deletePost(postId:ID!){
    deletePost(postId:$postId)
}
`
