import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [chats, setChats] = useState();
  const [selectedChats, setSelectedChats] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      setUser(userInfo);
      if (!userInfo) {
        navigate("/"); // Navigate to the login page if no user info
      }
    } catch (error) {
      console.error("Failed to retrieve user info from localStorage", error);
      setUser(null); // Reset user to null in case of error
      navigate("/"); // Navigate to the login page
    }
  }, [navigate]);

  return (
    <ChatContext.Provider
      value={{
        user,
        setUser,
        chats,
        setChats,
        selectedChats,
        setSelectedChats,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
