import MessageContainer from "./MessageContainer"
import SendMessageForm from "./SendMessageForm"
const ChatRoom = ({ messages, setMessages, sendMessage, chatRoom, username, type = "global" }) => {
    return (
        <div className="flex flex-col justify-center w-[400px]">
            <MessageContainer type={type} messages={messages} setMessages={setMessages} chatRoom={chatRoom} username={username} />
            <SendMessageForm type={type} sendMessage={sendMessage} chatRoom={chatRoom} username={username} />
        </div>
    )
}

export default ChatRoom