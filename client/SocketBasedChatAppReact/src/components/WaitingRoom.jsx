import { useState } from "react";
import { Input } from "@/components/ui/input"
import { Button } from "./ui/button";

const WaitingRoom = ({ joinChatRoom, username, setUsername, chatRoom, setChatRoom, type = "global" }) => {
    const [error, setError] = useState(false);
    return (
        <form
            className="w-[400px]"
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
            <h3 className="my-4 text-lg font-semibold">
                Waiting Room
            </h3>
            {error && <div>Can&apos;t access global chat through this panel!</div>}
            <div className="flex flex-col gap-1.5">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Input type="username" id="username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                {type === "global"
                    ? null
                    : <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Input type="chatRoom" id="chatRoom" placeholder="Chat Room" value={chatRoom} onChange={(e) => setChatRoom(e.target.value)} />
                    </div>
                }
                <Button type="submit" className="mt-2 ">Join {type === "global" && 'Global'} Chat!</Button>
            </div>
        </form>
    )
}

export default WaitingRoom