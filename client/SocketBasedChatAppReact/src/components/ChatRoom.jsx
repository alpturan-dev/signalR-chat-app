import MessageContainer from "./MessageContainer"
import SendMessageForm from "./SendMessageForm"
const ChatRoom = ({ messages, setMessages, sendMessage, chatRoom, username }) => {
    return (
        <div>
            <h4>Chat Room</h4>
            <MessageContainer messages={messages} setMessages={setMessages} chatRoom={chatRoom} />
            <SendMessageForm sendMessage={sendMessage} chatRoom={chatRoom} username={username} />
        </div>
    )
}

export default ChatRoom