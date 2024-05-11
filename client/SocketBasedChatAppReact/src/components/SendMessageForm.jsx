import { useState } from "react";

const SendMessageForm = ({ sendMessage }) => {
    const [message, setMessage] = useState("");
    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                sendMessage(message);
                setMessage("");
            }}
        >
            <h5>Chat</h5>
            <input value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type message..." />
            <button type="submit" disabled={!message}>Send</button>
        </form>
    )
}

export default SendMessageForm