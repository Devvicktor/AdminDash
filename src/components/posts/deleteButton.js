import React,{useState} from "react";
import { useMutation } from "@apollo/react-hooks";
import { Button, Confirm, Icon } from "semantic-ui-react";
import gql from "graphql-tag";
import { POST_QUERY } from "../../graphql/postQuery";
export default function DeleteButton({postId}) {
    const [confirmOpen, setconfirmOpen] = useState(false)
    const[DeletePost]=useMutation(DELETE_POST,{
       update(cache){
         setconfirmOpen(false);
         const existingPosts= cache.readQuery({query: POST_QUERY});
         const newPosts=existingPosts.getPosts.filter(p => p.id !== postId);
          cache.writeQuery({ query: POST_QUERY, data :{getPosts:newPosts}})
       },
       variables:{
           postId
       }

    })
  return (
    <>
      <Button color="red" as='div' floated='right' onClick={()=>setconfirmOpen(true)}><Icon name='trash' style={{margin:0}}/></Button>
      <Confirm
      open={confirmOpen}
      onCancel={()=>setconfirmOpen(false)}
      onConfirm={DeletePost }
      />

    </>
  );
}
const DELETE_POST = gql`
mutation deletePost($postId:ID!){
    deletePost(postId:$postId)
}
`;
