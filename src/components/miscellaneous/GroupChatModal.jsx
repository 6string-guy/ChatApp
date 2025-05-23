import React, { useState } from "react";
import { ChatState } from "../../Context/ChatProvider";
import axios from "axios";
import UserListItem from "../userAvatar/UserListItem";
import UserBadgeItem from "../userAvatar/UserBadgeItem";

function GroupChatModal({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [groupChatName, setGroupChatName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const {
    setSelectedChats,
    selectedChats,
    user,
    notification,
    setNotification,
    chats,
    setChats,
  } = ChatState();

  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) return;

    try {
      setLoading(true);
      const config = {
        headers: { Authorization: `Bearer ${user.token}` },
      };
      const { data } = await axios.get(
        `https://chatapp-0eao.onrender.com/api/user?search=${search}`,
        config
      );
      setSearchResult(data);
      setLoading(false);
    } catch (error) {
      alert("Failed to load search results.");
      setLoading(false);
    }
  };

  const handleGroup = (userToAdd) => {
    if (selectedUsers.some((u) => u._id === userToAdd._id)) {
      alert("User already added.");
      return;
    }
    setSelectedUsers([...selectedUsers, userToAdd]);
  };

  const handleDelete = (delUser) => {
    setSelectedUsers(selectedUsers.filter((u) => u._id !== delUser._id));
  };

  const handleSubmit = async () => {
    if (!groupChatName || selectedUsers.length === 0) {
      alert("Please fill all fields.");
      return;
    }

    try {
      const config = {
        headers: { Authorization: `Bearer ${user.token}` },
      };
      const { data } = await axios.post(
        `https://chatapp-0eao.onrender.com/api/chat/group`,
        {
          name: groupChatName,
          users: JSON.stringify(selectedUsers.map((u) => u._id)),
        },
        config
      );
      setChats([data, ...chats]);
      setIsOpen(false);
      alert("Group chat created!");
    } catch (error) {
      alert("Failed to create group chat.");
    }
  };

  return (
    <>
      <span onClick={() => setIsOpen(true)}>{children}</span>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 font-sans">
          <div className="bg-white rounded-lg w-full max-w-2xl shadow-xl p-6 relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold text-center text-blue-700 mb-4">
              Create Group Chat
            </h2>

            <input
              type="text"
              placeholder="Chat Name"
              onChange={(e) => setGroupChatName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-3"
            />

            <input
              type="text"
              placeholder="Add Users eg: John, Piyush, Jane"
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-3"
            />

            <div className="flex flex-wrap gap-2 mb-3">
              {selectedUsers.map((u) => (
                <UserBadgeItem
                  key={u._id}
                  user={u}
                  handleFunction={() => handleDelete(u)}
                />
              ))}
            </div>

            <div className="max-h-40 overflow-y-auto">
              {loading ? (
                <div className="text-center py-4 text-gray-500">Loading...</div>
              ) : (
                searchResult
                  .slice(0, 4)
                  .map((user) => (
                    <UserListItem
                      key={user._id}
                      user={user}
                      handleFunction={() => handleGroup(user)}
                    />
                  ))
              )}
            </div>

            <div className="text-right mt-4">
              <button
                onClick={handleSubmit}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
              >
                Create Chat
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default GroupChatModal;
