import { useState } from "react"

const WaitingRoom = ({ joinChatRoom }) => {
    const [username, setUsername] = useState("")
    const [chatRoom, setChatRoom] = useState("")
    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                joinChatRoom(username, chatRoom);
            }}
        >
            <h3>Waiting Room</h3>
            <input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input placeholder="ChatRoom" value={chatRoom} onChange={(e) => setChatRoom(e.target.value)} />
            <button type="submit">Join Chat!</button>
        </form>
    )
}

export default WaitingRoom