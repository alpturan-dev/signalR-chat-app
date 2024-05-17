import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const SendMessageForm = ({ type, sendMessage, chatRoom, username }) => {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    return (
        <form className="flex flex-row gap-2"
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
            <Input value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type message..." />
            <Button type="submit" disabled={!message}>{loading ? 'Sending...' : 'Send'}</Button>
        </form>
    )
}

export default SendMessageForm