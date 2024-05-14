import { useState } from "react"
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import ChatRoom from "../components/ChatRoom";
import WaitingRoom from "../components/WaitingRoom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useConnStore } from "../store/store";

function Dashboard() {
    const navigate = useNavigate();
    const conn = useConnStore((state) => state.conn);
    const setConn = useConnStore((state) => state.setConn);
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
            <div>
                <button onClick={() => navigate('/global-chat')}>Global Chat</button>
                <button onClick={() => navigate('/group-chat')}>Group Chat</button>
            </div>
            {/* {conn ?
                <ChatRoom messages={messages} setMessages={setMessages} sendMessage={sendMessage} chatRoom={chatRoom} username={username} /> :
                <WaitingRoom joinChatRoom={joinChatRoom} username={username} setUsername={setUsername} chatRoom={chatRoom} setChatRoom={setChatRoom} />
            } */}
        </div>
    )
}

export default Dashboard
