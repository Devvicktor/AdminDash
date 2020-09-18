import React, { useState } from "react";
import { Button, Form } from "semantic-ui-react";
import RichTextEditor from "../RichText";
export default function CreateForm() {
  const [values, setValues] = useState({
    title: "",
    tag: "",
  });
  const handleChange=(event)=>{
      setValues({
          ...values,
          [event.target.name]:event.target.value
      })
  }
  return (
    <div>
      <Form>
        <Form.Field>
          <Form.Input
            name="title"
            value={values.title}
            type="text"
            label="Post-title"
            placeholder="Ttle"
            onChange={handleChange}
          />
          <Form.Input
            name="tag"
            value={values.tag}
            type="text"
            label="Post-Tag"
            placeholder="Post tag"
            onChange={handleChange}
          />
        </Form.Field>
        <RichTextEditor/>e
        <Button>Create Post</Button>
      </Form>
    </div>
  );
}
