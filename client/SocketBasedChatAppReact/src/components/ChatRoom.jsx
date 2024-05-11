import MessageContainer from "./MessageContainer"
import SendMessageForm from "./SendMessageForm"
const ChatRoom = ({ messages, sendMessage }) => {
    return (
        <div>
            <h4>Chat Room</h4>
            <MessageContainer messages={messages} />
            <SendMessageForm sendMessage={sendMessage} />
        </div>
    )
}

export default ChatRoom