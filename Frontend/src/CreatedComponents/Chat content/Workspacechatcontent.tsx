import { useEffect, useState } from "react";
import RichTextEditor from "../TextEditor/Texteditor";
import Message from "./Message";
import TopBar from "./TopBar";
import axios from "axios";
import { useSelector } from "react-redux";

interface Props {
  chatname: string;
}

type Messaget = {
  sender: string;
  time: string;
  content: string;
};

function Workspacechatcontent(props: Props) {
  const { chatname } = props;
  const [messages, setMessages] = useState<Messaget[]>([]);
  const [ws, setWs] = useState<WebSocket | null>(null);
  const user = useSelector((state: any) => state.auth.details.name);

  useEffect(() => {
    // Initialize WebSocket connection
    const socket = new WebSocket('ws://localhost:5000','echo-protocol');
    setWs(socket);

    // On connection open
    socket.onopen = () => {
      console.log('Connected to WebSocket server');
    };

    socket.onerror = (error) => {
        console.error('WebSocket error:', error);
      };
    const date = new Date();
    // On receiving a message from the server
    socket.onmessage = (event: MessageEvent) => {
        console.log('Raw message data:', event);
        try {
          const message = JSON.parse(event.data);
          console.log('Parsed message:', message);
         const newmessage = {sender:user,time:date.toLocaleString(),content:message.data}
        
         setMessages((prevMessages) => [...prevMessages, newmessage]);
         console.log(messages)
        } catch (e) {
          console.error('Failed to parse message:', e);
        }
    };

    // On connection close
    socket.onclose = () => {
      console.log('Disconnected from WebSocket server');
    };

    // Cleanup on component unmount
    return () => {
      socket.close();
    };
  }, []);

  const getChat = () => {
    axios.post("http://localhost:5000/message/specificchat", { chatname: chatname })
      .then(response => {
        console.log(response.data.chat.messages);
        setMessages([...response.data.chat.messages]);
      })
      .catch(err => {
        console.log(err.response.data);
      });
  };

  useEffect(() => {
    getChat();
  }, [chatname]);

  return (
    <div className="w-full">
      <div className="flex-1 flex flex-col bg-slate-200 overflow-hidden h-full">
        {/* Top bar */}
        <TopBar chatname={chatname} />
        {/* Chat messages */}
        <div className="px-6 py-4 flex-1 overflow-y-scroll">
          {/* All messages */}
          {messages.length > 0 ? (
            messages.map((ele, index) => (
              <Message key={index} sender={ele.sender} time={ele.time} content={ele.content} />
            ))
          ) : (
            <div>Post a message</div>
          )}
        </div>
        <div className="pb-6 px-4 flex-none bg-gray-200">
          <div className="flex rounded-lg border-2 border-grey overflow-hidden bg-gray-300 p-6 h-60">
            <RichTextEditor chatname={chatname} ws={ws} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Workspacechatcontent;
