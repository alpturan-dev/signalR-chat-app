import axios from "axios";
import { useEffect } from "react"

const MessageContainer = ({ messages, setMessages, chatRoom, type }) => {

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
        <div>
            {messages.map((msg, index) => (
                <div key={index}>{msg.message} - {msg.sender}</div>
            ))}
        </div>
    )
}

export default MessageContainer