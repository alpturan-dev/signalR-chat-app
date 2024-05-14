import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { useState } from 'react'
import { useConnStore } from '../store/store';
import ChatRoom from '../components/ChatRoom';
import WaitingRoom from '../components/WaitingRoom';
import axios from 'axios';

const GroupChat = () => {
    const { conn, setConn } = useConnStore();
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
            <div>Group Chat</div>
            {conn ?
                <ChatRoom type="group" messages={messages} setMessages={setMessages} sendMessage={sendMessage} chatRoom={chatRoom} username={username} /> :
                <WaitingRoom type="group" joinChatRoom={joinChatRoom} username={username} setUsername={setUsername} chatRoom={chatRoom} setChatRoom={setChatRoom} />
            }
        </div>
    )
}

export default GroupChat