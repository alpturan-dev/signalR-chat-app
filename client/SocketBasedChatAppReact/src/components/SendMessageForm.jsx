import { useState } from "react";

const SendMessageForm = ({ type, sendMessage, chatRoom, username }) => {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    return (
        <form
            onSubmit={async (e) => {
                e.preventDefault();
                setLoading(true);
                if (type === "global") {
                    await sendMessage('global', message, username);
                } else {
                    await sendMessage(chatRoom, message, username);
                }
                setMessage("");
                setLoading(false);
            }}
        >
            <h5>Chat</h5>
            <input value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type message..." />
            <button type="submit" disabled={!message}>{loading ? 'Sending...' : 'Send'}</button>
        </form>
    )
}

export default SendMessageForm