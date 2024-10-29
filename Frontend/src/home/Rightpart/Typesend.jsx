import React, { useEffect, useState } from "react";
import { IoSend } from "react-icons/io5";
import useSendMessage from "../../context/useSendMessage.js";
import useConversation from "../../zustand/useConversation.js";
import { useSocketContext } from "../../context/SocketContext.jsx";

function Typesend() {
  const { socket } = useSocketContext();
  const [message, setMessage] = useState("");
  const { sendMessages } = useSendMessage();
  const { selectedConversation } = useConversation();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(selectedConversation._id);
    if (!message) return;
    setMessage("");
    await sendMessages(message);
  };
  useEffect(() => {
    socket.on("typing", () => {
      setTyping(true);
    });
    socket.on("typingStop", () => {
      setTyping(false);
    });

    return () => {
      socket.off("typing");
      socket.off("typingStop");
    };
  }, []);
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex space-x-1 h-[8vh]  bg-gray-800">
        <div className=" w-[70%] mx-4">
          <input
            type="text"
            placeholder="Type here"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value),
                socket.emit("typing", selectedConversation._id);
            }}
            className="border border-gray-700 rounded-xl outline-none mt-1 px-4 py-3 w-full"
          />
        </div>
        <button>
          <IoSend className="text-3xl" />
        </button>
      </div>
    </form>
  );
}

export default Typesend;
