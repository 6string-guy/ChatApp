import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import axios from "axios";
import { ChatState } from "../../Context/ChatProvider";
import ProfileModal from "./ProfileModal";
import ChatLoading from "../ChatLoading";
import UserListItem from "../userAvatar/UserListItem";

function SideDrawer() {
  const [searchResult, setSearchResult] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const navigate = useNavigate();
  const {
    selectedChats,
    setSelectedChats,
    user,
    notification,
    setNotification,
    chats,
    setChats,
  } = ChatState();

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  const handleSearch = async () => {
    if (!search) {
      alert("Please enter something in search.");
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(
        `https://chatapp-0eao.onrender.com/api/user?search=${search}`,
        config
      );
      setSearchResult(data);
      setLoading(false);
    } catch (error) {
      alert("Error fetching search results.");
      setLoading(false);
    }
  };

  const accessChat = async (userId) => {
    setSelectedChats(userId);
    try {
      setLoading(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(
        `https://chatapp-0eao.onrender.com/api/chat`,
        { userId },
        config
      );
      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChats(data);
      setLoading(false);
      setDrawerOpen(false);
    } catch (error) {
      alert("Error fetching the chat.");
    }
  };

  return (
    <>
      {/* Header */}
      <div className="flex justify-between items-center bg-white border-b-4 border-blue-600 p-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setDrawerOpen(true)}
            className="flex items-center gap-2 px-3 py-2 text-blue-700 bg-yellow-300 hover:bg-yellow-400 rounded shadow"
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
            <span className="hidden md:inline">Search</span>
          </button>
        </div>
        <h1 className="text-xl font-bold text-blue-700">Chat App</h1>
        <div className="flex items-center gap-3">
          <BellIcon className="text-blue-700 text-xl cursor-pointer" />
          <div className="relative group">
            <button className="flex items-center gap-2 p-2 bg-yellow-300 hover:bg-yellow-400 rounded-full">
              <img
                src={user.pic}
                alt={user.name}
                className="w-8 h-8 rounded-full object-cover"
              />
              <ChevronDownIcon className="text-blue-700" />
            </button>
            <div className="absolute right-0 mt-2 hidden group-hover:block bg-white border rounded shadow-lg w-48 z-10">
              <ProfileModal user={user}>
                <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  My Profile
                </div>
              </ProfileModal>
              <hr />
              <div
                className="px-4 py-2 hover:bg-red-100 text-red-500 cursor-pointer"
                onClick={logoutHandler}
              >
                Logout
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="w-80 bg-white shadow-xl p-4 overflow-y-auto">
            <h2 className="text-lg font-semibold border-b pb-2 mb-4">
              Search Users
            </h2>
            <div className="flex mb-4">
              <input
                type="text"
                placeholder="Search by name or email"
                className="flex-grow p-2 border border-gray-300 rounded-l"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button
                onClick={handleSearch}
                className="px-4 bg-blue-600 text-white font-medium rounded-r hover:bg-blue-700"
              >
                Go
              </button>
            </div>
            {loading ? (
              <ChatLoading />
            ) : (
              searchResult.map((u) => (
                <UserListItem
                  key={u._id}
                  user={u}
                  handleFunction={() => accessChat(u._id)}
                />
              ))
            )}
          </div>
          <div
            className="flex-1 bg-black bg-opacity-50"
            onClick={() => setDrawerOpen(false)}
          />
        </div>
      )}
    </>
  );
}

export default SideDrawer;
