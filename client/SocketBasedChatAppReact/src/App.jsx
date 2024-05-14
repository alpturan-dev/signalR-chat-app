import { useState } from "react"
import WaitingRoom from "./components/WaitingRoom"
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import ChatRoom from "./components/ChatRoom";
import axios from "axios";

function App() {
  const [conn, setConn] = useState("");
  const [messages, setMessages] = useState([]);
  const [chatRoom, setChatRoom] = useState("");
  const [username, setUsername] = useState("");

  const joinChatRoom = async (username, chatRoom) => {
    try {
      //initiate conn
      const conn = new HubConnectionBuilder()
        .withUrl("http://localhost:5278/chat")
        .configureLogging(LogLevel.Information)
        .build();

      //SET UP HANDLERS
      //triggers when join chat
      conn.on("ReceiveMessage", (username, msg) => {
        setMessages((messages) => [...messages, { sender: username, message: msg }])
      })

      //triggers when send message
      conn.on("ReceiveSpecificMessage", (username, msg) => {
        setMessages((messages) => [...messages, { sender: username, message: msg }])
      })

      await conn.start();
      await conn.invoke("JoinSpecificChatRoom", { username, chatRoom });
      setConn(conn);

    } catch (error) {
      console.log(error)
    }
  }

  const sendMessage = async (chatRoom, message, sender) => {
    try {
      await conn.invoke("SendMessage", message);
      await postMessagesToDb(chatRoom, message, sender);
    } catch (error) {
      console.log(error);
    }
  }

  const postMessagesToDb = async (chatRoom, message, sender) => {
    await axios.post('http://localhost:5278/api/message', {
      room: chatRoom,
      message: message,
      sender: sender
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <div>
      <h1>Welcome to Socket Chat App!</h1>
      {conn ?
        <ChatRoom messages={messages} setMessages={setMessages} sendMessage={sendMessage} chatRoom={chatRoom} username={username} /> :
        <WaitingRoom joinChatRoom={joinChatRoom} username={username} setUsername={setUsername} chatRoom={chatRoom} setChatRoom={setChatRoom} />
      }
    </div>
  )
}

export default App
