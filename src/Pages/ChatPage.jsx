import React, { useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import SideDrawer from "../components/miscellaneous/SideDrawer.jsx";
import MyChats from "../components/MyChats.jsx";
import ChatBox from "../components/ChatBox.jsx";

const ChatPage = () => {
  const { user } = ChatState();
  const [fetchAgain, setFetchAgain] = useState();

  return (
    <div className="flex flex-col w-full h-screen">
      {user && <SideDrawer />}
      <div className="flex justify-between w-full h-[91.5vh] p-2 bg-gray-100">
        {user && (
          <div className="flex w-1/3 bg-white shadow-lg rounded-lg p-4">
            <MyChats fetchAgain={fetchAgain} />
          </div>
        )}
        {user && (
          <div className="flex w-2/3 bg-white shadow-lg rounded-lg p-4 ml-4">
            <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
