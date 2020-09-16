import React from 'react'
import {Button, Form } from 'semantic-ui-react'
import MyEditor from '../richTextEditor'
export default function CreateForm() {
    return (
        <div>
            <Form>
                <Form.Field>
                    <Form.Input name='title' type='text' label='Post-title' value='title' placeholder='Ttle' />
                    <Form.Input name='title' type='text' label='Post-title' value='title' placeholder='Ttle' />
                    <Form.Input name='title' type='text' label='Post-title' value='title' placeholder='Ttle' />
                    <Form.Input name='title' type='text' label='Post-title' value='title' placeholder='Ttle' />
                    <MyEditor/>

                </Form.Field>
                <Button>Create Post</Button>
            </Form>
        </div>
    )
}
