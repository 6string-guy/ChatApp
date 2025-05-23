import React, { useState } from "react";
import axios from "axios";
import { ChatState } from "../../Context/ChatProvider";
import UserBadgeItem from "../userAvatar/UserBadgeItem";
import UserListItem from "../userAvatar/UserListItem";

function UpdateGroupChatModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [groupChatName, setGroupChatName] = useState("");
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [renameloading, setRenameLoading] = useState(false);

  const {
    selectedChats,
    setSelectedChats,
    user,
    fetchAgain,
    setFetchAgain,
    fetchMessages,
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
        `https://chatapp-0eao.onrender.com/api/user?search=${query}`,
        config
      );
      setSearchResult(data);
      setLoading(false);
    } catch {
      alert("Failed to load search results");
      setLoading(false);
    }
  };

  const handleRename = async () => {
    if (!groupChatName) return;
    try {
      setRenameLoading(true);
      const config = {
        headers: { Authorization: `Bearer ${user.token}` },
      };
      const { data } = await axios.put(
        `https://chatapp-0eao.onrender.com/api/chat/rename`,
        {
          chatId: selectedChats._id,
          chatName: groupChatName,
        },
        config
      );
      setSelectedChats(data);
      setFetchAgain(!fetchAgain);
      setRenameLoading(false);
      setGroupChatName("");
    } catch (error) {
      alert(error.response.data.message);
      setRenameLoading(false);
    }
  };

  const handleAddUser = async (user1) => {
    if (selectedChats.users.find((u) => u._id === user1._id)) {
      alert("User already in group");
      return;
    }
    if (selectedChats.groupAdmin._id !== user._id) {
      alert("Only admins can add someone");
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: { Authorization: `Bearer ${user.token}` },
      };
      const { data } = await axios.put(
        `https://chatapp-0eao.onrender.com/api/chat/groupadd`,
        {
          chatId: selectedChats._id,
          userId: user1._id,
        },
        config
      );
      setSelectedChats(data);
      setFetchAgain(!fetchAgain);
      setLoading(false);
    } catch (error) {
      alert(error.response.data.message);
      setLoading(false);
    }
  };

  const handleRemove = async (user1) => {
    if (selectedChats.groupAdmin._id !== user._id && user1._id !== user._id) {
      alert("Only admins can remove someone");
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: { Authorization: `Bearer ${user.token}` },
      };
      const { data } = await axios.put(
        `https://chatapp-0eao.onrender.com/api/chat/groupremove`,
        {
          chatId: selectedChats._id,
          userId: user1._id,
        },
        config
      );
      user1._id === user._id ? setSelectedChats() : setSelectedChats(data);
      setFetchAgain(!fetchAgain);
      fetchMessages();
      setLoading(false);
    } catch (error) {
      alert(error.response.data.message);
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 text-blue-600 hover:text-yellow-500"
        title="Edit Group"
      >
        👁️
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white max-w-xl w-full rounded-xl shadow-lg p-6 relative">
            <button
              className="absolute top-2 right-3 text-gray-500 hover:text-red-600"
              onClick={() => setIsOpen(false)}
            >
              ✕
            </button>

            <h2 className="text-3xl font-bold text-center text-blue-700 mb-4">
              {selectedChats.chatName}
            </h2>

            <div className="flex flex-wrap gap-2 mb-4">
              {selectedChats.users.map((u) => (
                <UserBadgeItem
                  key={u._id}
                  user={u}
                  admin={selectedChats.groupAdmin}
                  handleFunction={() => handleRemove(u)}
                />
              ))}
            </div>

            <div className="flex gap-2 mb-3">
              <input
                type="text"
                className="flex-1 border border-gray-300 rounded px-3 py-2"
                placeholder="New Chat Name"
                value={groupChatName}
                onChange={(e) => setGroupChatName(e.target.value)}
              />
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 rounded"
                onClick={handleRename}
                disabled={renameloading}
              >
                {renameloading ? "Renaming..." : "Update"}
              </button>
            </div>

            <input
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2 mb-3"
              placeholder="Add user to group"
              onChange={(e) => handleSearch(e.target.value)}
            />

            {loading ? (
              <div className="text-center py-2">Loading...</div>
            ) : (
              searchResult.map((u) => (
                <UserListItem
                  key={u._id}
                  user={u}
                  handleFunction={() => handleAddUser(u)}
                />
              ))
            )}

            <div className="text-center mt-6">
              <button
                onClick={() => handleRemove(user)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
              >
                Leave Group
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default UpdateGroupChatModal;
