import { useState } from "react";

const WaitingRoom = ({ joinChatRoom, username, setUsername, chatRoom, setChatRoom, type = "global" }) => {
    const [error, setError] = useState(false);
    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                if (type === "global") setChatRoom("global");
                if (type !== "global" && chatRoom === "global") {
                    setError(true);
                    return;
                }
                joinChatRoom(username, chatRoom);
            }}
        >
            <h3>Waiting Room</h3>
            {error && <div>Can&apos;t access global chat through this panel!</div>}
            <input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            {type === "global"
                ? null
                : <input placeholder="ChatRoom" value={chatRoom} onChange={(e) => setChatRoom(e.target.value)} />
            }
            <button type="submit">Join {type === "global" && 'Global'} Chat!</button>
        </form>
    )
}

export default WaitingRoom