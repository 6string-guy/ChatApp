import React, { useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import SideDrawer from "../components/miscellaneous/SideDrawer.jsx";
import MyChats from "../components/MyChats.jsx";
import ChatBox from "../components/ChatBox.jsx";

const ChatPage = () => {
  const { user } = ChatState();
  const [fetchAgain, setFetchAgain] = useState();

  return (
    <div className="w-full font-sans bg-gradient-to-br from-blue-500 via-blue-400 to-yellow-300 min-h-screen">
      {user && <SideDrawer />}
      <div className="flex justify-between w-full h-[91.5vh] p-4">
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </div>
    </div>
  );
};

export default ChatPage;
