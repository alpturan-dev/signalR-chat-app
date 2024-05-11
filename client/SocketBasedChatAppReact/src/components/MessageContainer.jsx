const MessageContainer = ({ messages }) => {
    return (
        <div>
            {messages.map((msg, index) => (
                <div key={index}>{msg.msg} - {msg.username}</div>
            ))}
        </div>
    )
}

export default MessageContainer