import axios from 'axios';
import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import the CSS for Quill
import { useSelector } from 'react-redux';

interface Props {
    chatname:string
}

function RichTextEditor(props:Props) {
  const {chatname} = props;
  const [editorValue, setEditorValue] = useState('');
  const user=useSelector(state=>state.auth.details.name)
  console.log(user)
  const handleChange = (value:any) => {
    setEditorValue(value);
    
  };

  const handleclick = () =>{
    console.log("hi")
    axios.post("http://localhost:5000/message/createMessage",{chatname:chatname,sender:user,content:editorValue},{withCredentials:true}).
    then((response)=>{
        console.log(response.data)
    }).catch((err)=>{
        console.log(err)
    })
  }


  return (
    <div className="p-4 bg-white shadow-md rounded-xl">
      <ReactQuill
        value={editorValue}
        onChange={handleChange}
        modules={RichTextEditor.modules}
        formats={RichTextEditor.formats}
      />
      <button onClick={handleclick} className="mt-10 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
        Send
      </button>
    </div>
  );
}

// Define the modules and formats you want to use
RichTextEditor.modules = {
  toolbar: [
    [{ 'header': '1'}, { 'header': '2'}, { 'font': [] }],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'align': [] }],
    ['bold', 'italic', 'underline'],
    ['link'],
    ['clean']
  ],
};

RichTextEditor.formats = [
  'header', 'font', 'list', 'bullet', 'align', 'bold', 'italic', 'underline', 'link'
];

export default RichTextEditor;
