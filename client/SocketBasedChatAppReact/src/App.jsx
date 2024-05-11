import { useState } from "react"
import WaitingRoom from "./components/WaitingRoom"
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import ChatRoom from "./components/ChatRoom";

function App() {
  const [conn, setConn] = useState("");
  const [messages, setMessages] = useState([]);

  const joinChatRoom = async (username, chatRoom) => {
    try {
      //initiate conn
      const conn = new HubConnectionBuilder()
        .withUrl("http://localhost:5278/chat")
        .configureLogging(LogLevel.Information)
        .build();

      //set up handler
      conn.on("ReceiveMessage", (username, msg) => {
        setMessages((messages) => [...messages, { username, msg }])
      })

      conn.on("ReceiveSpecificMessage", (username, msg) => {
        setMessages((messages) => [...messages, { username, msg }])
      })

      await conn.start();
      await conn.invoke("JoinSpecificChatRoom", { username, chatRoom });
      setConn(conn);

    } catch (error) {
      console.log(error)
    }
  }

  const sendMessage = async (message) => {
    try {
      await conn.invoke("SendMessage", message);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <h1>Welcome to Socket Chat App!</h1>
      {conn ?
        <ChatRoom messages={messages} sendMessage={sendMessage} /> :
        <WaitingRoom joinChatRoom={joinChatRoom} />
      }
    </div>
  )
}

export default App
