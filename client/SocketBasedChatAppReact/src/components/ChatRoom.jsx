import MessageContainer from "./MessageContainer"
import SendMessageForm from "./SendMessageForm"
const ChatRoom = ({ messages, setMessages, sendMessage, chatRoom, username, type = "global" }) => {
    return (
        <div>
            <h4>Chat Room</h4>
            <MessageContainer type={type} messages={messages} setMessages={setMessages} chatRoom={chatRoom} />
            <SendMessageForm type={type} sendMessage={sendMessage} chatRoom={chatRoom} username={username} />
        </div>
    )
}

export default ChatRoom