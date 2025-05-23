import React from "react";
import ScrollableFeed from "react-scrollable-feed";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "./config/ChatLogics";
import { ChatState } from "../Context/ChatProvider";

function ScrollableChats({ messages }) {
  const { user } = ChatState();

  return (
    <ScrollableFeed>
      {messages &&
        messages.map((m, i) => (
          <div
            key={m._id}
            className="flex items-center"
            style={{
              marginTop: isSameUser(messages, m, i, user._id) ? "3px" : "10px",
              marginLeft: isSameSenderMargin(messages, m, i, user._id),
            }}
          >
            {(isSameSender(messages, m, i, user._id) ||
              isLastMessage(messages, i, user._id)) &&
              m.sender._id !== user._id && (
                <div className="mr-1 mt-1 group relative">
                  <img
                    className="w-6 h-6 rounded-full cursor-pointer"
                    src={m.sender.pic}
                    alt={m.sender.name}
                    title={m.sender.name} // native tooltip
                  />
                </div>
              )}
            <span
              className={`rounded-2xl px-4 py-1 max-w-[75%] text-sm ${
                m.sender._id === user._id
                  ? "bg-blue-200 text-black"
                  : "bg-green-200 text-black"
              }`}
            >
              {m.content}
            </span>
          </div>
        ))}
    </ScrollableFeed>
  );
}

export default ScrollableChats;
