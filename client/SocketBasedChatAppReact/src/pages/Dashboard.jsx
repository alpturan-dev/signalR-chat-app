import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { AiOutlineGlobal } from "react-icons/ai";
import { IoIosPeople } from "react-icons/io";
import { IoPerson } from "react-icons/io5";

function Dashboard() {
    const navigate = useNavigate();

    return (
        <div className="m-auto h-screen flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold ">Socket Based</h1>
            <h1 className="text-3xl font-bold mb-8">Chat App</h1>
            <div className="flex flex-col gap-4 ">
                <Button className="flex flex-row" onClick={() => navigate('/global-chat')}>
                    <AiOutlineGlobal size={20} className="mr-4 text-slate-300 " />
                    <p>Join Global Chat</p>
                </Button>
                <Button className="flex flex-row " onClick={() => navigate('/group-chat')}>
                    <IoIosPeople size={20} className="mr-4 text-slate-300" />
                    <p>
                        Join Group Chat
                    </p>
                </Button>
                <Button className="flex flex-row " onClick={() => navigate('/direct-chat')}>
                    <IoPerson size={20} className="mr-4 text-slate-300" />
                    <p>
                        Join Direct Chat
                    </p>
                </Button>
            </div>
        </div>
    )
}

export default Dashboard
