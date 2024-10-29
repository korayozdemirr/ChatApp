import useConversation from "../zustand/useConversation.js";
import axios from "axios";
const useSendMessage = () => {
  const { messages, setMessage, selectedConversation } = useConversation();
  const sendMessages = async (message) => {
    try {
      const res = await axios.post(
        `/api/message/send/${selectedConversation._id}`,
        { message }
      );
      setMessage([...messages, res.data]);
    } catch (error) {
      console.log("Error in send messages", error);
    }
  };
  return { sendMessages };
};

export default useSendMessage;
