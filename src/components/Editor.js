import React from 'react';
 import { Editor } from '@tinymce/tinymce-react';

 class App extends React.Component {
   handleEditorChange = (content, editor) => {
     console.log('Content was updated:', content);
   }

   render() {
     return (
        <Editor

        value={bodyInput}
        apiKey="5lj8z7py09g24pd8wjmbd68f3ypdfum99fbt50a51f9cwglv"
        init={{
          height: 500,
          menubar: false,
          plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table paste code help wordcount",
          ],
          toolbar:
            "undo redo | formatselect | bold italic backcolor code | \
alignleft aligncenter alignright alignjustify | \
bullist numlist outdent indent | removeformat | help",
        }}
        onEditorChange={handleEditorChange}
      />
     );
   }
 }

 export default App;