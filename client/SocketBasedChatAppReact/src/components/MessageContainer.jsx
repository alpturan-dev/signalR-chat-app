import axios from "axios";
import { useEffect } from "react"
import { FaArrowCircleRight, FaComment } from "react-icons/fa";

const MessageContainer = ({ messages, setMessages, chatRoom, type, username }) => {

    const getMessagesFromDb = async () => {
        await axios.get('http://localhost:5278/api/message' + `/${type === "global" ? 'global' : chatRoom}`)
            .then(function (response) {
                // handle success
                setMessages(response.data);
                console.log(response);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }

    useEffect(() => {
        getMessagesFromDb();
    }, []);

    return (
        <div className="flex flex-col gap-4 pt-6 pb-6 max-h-[500px]  overflow-scroll">
            {messages.map((msg, index) => (
                <div key={index} className="flex flex-col">
                    {!(msg.sender === username) ?
                        msg.sender === "admin" ? (
                            <div className="flex flex-col rounded py-2 px-2 bg-green-100">
                                <span className="flex items-center text-green-900 font-semibold">
                                    <FaArrowCircleRight size={15} className=" text-green-900 mr-1" />
                                    {msg.sender}
                                </span>
                                <span>{msg.message}</span>
                            </div>
                        ) : (
                            <div className="flex flex-col rounded py-2 px-2 bg-blue-100 gap-1">
                                <span className="flex items-center text-blue-900 font-semibold">
                                    <FaComment size={15} className=" text-blue-900 mr-1" />
                                    {msg.sender}
                                </span>
                                <span>{msg.message}</span>
                            </div>
                        )
                        :
                        <div className="self-end rounded py-2 px-2 bg-blue-900 text-white">
                            <span>{msg.message}</span>
                        </div>
                    }
                </div>
            ))}
        </div>
    )
}

export default MessageContainer