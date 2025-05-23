import React, { useEffect, useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import axios from "axios";
import ChatLoading from "./ChatLoading";
import { getSender } from "./config/ChatLogics.js";
import GroupChatModal from "./miscellaneous/GroupChatModal";
import { AddIcon } from "@chakra-ui/icons"; // Optional: replace with a Tailwind-compatible icon

function MyChats({ fetchAgain }) {
  const { setSelectedChats, selectedChats, user, chats, setChats } =
    ChatState();
  const [loggedUser, setLoggedUser] = useState();

  const fetchChats = async () => {
    try {
      const response = await fetch(
        `https://chatapp-0eao.onrender.com/api/chat`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch chats");

      const data = await response.json();
      setChats(data);
    } catch (error) {
      console.error("Fetch chats failed", error);
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  }, [fetchAgain]);

  return (
    <div
      className={`${
        selectedChats ? "hidden" : "flex"
      } md:flex flex-col items-center p-3 bg-white w-full md:w-[31%] rounded-lg border`}
    >
      <div className="pb-3 px-3 text-[24px] md:text-[30px] font-sans w-full flex justify-between items-center">
        <span>My Chats</span>
        <GroupChatModal>
          <button className="flex items-center text-[17px] md:text-[10px] lg:text-[17px] px-2 py-1 bg-gray-200 rounded">
            <AddIcon className="mr-1" />
            New Group Chat
          </button>
        </GroupChatModal>
      </div>

      <div className="flex flex-col p-3 bg-gray-100 w-full h-full rounded-lg overflow-y-hidden">
        {chats ? (
          <div className="overflow-y-scroll space-y-2">
            {chats.map((chat) => (
              <div
                key={chat._id}
                onClick={() => setSelectedChats(chat)}
                className={`cursor-pointer px-3 py-2 rounded-lg ${
                  selectedChats === chat
                    ? "bg-teal-500 text-white"
                    : "bg-gray-200 text-black"
                }`}
              >
                <div>
                  {!chat.isGroupChat
                    ? getSender(loggedUser, chat.users)
                    : chat.chatName}
                </div>
                {chat.latestMessage && (
                  <div className="text-xs">
                    <strong>{chat.latestMessage.sender.name}:</strong>{" "}
                    {chat.latestMessage.content.length > 50
                      ? chat.latestMessage.content.substring(0, 51) + "..."
                      : chat.latestMessage.content}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <ChatLoading />
        )}
      </div>
    </div>
  );
}

export default MyChats;
