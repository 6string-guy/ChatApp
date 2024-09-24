import React, { useEffect, useState } from "react";
import { Button, Stack, useToast } from "@chakra-ui/react";
import { ChatState } from "../Context/ChatProvider";
import { Box , Text} from "@chakra-ui/react";
import axios from "axios";
import { AddIcon } from "@chakra-ui/icons";
import ChatLoading from "./ChatLoading";
import { getSender } from "./config/ChatLogics.js";
import GroupChatModal from "./miscellaneous/GroupChatModal";


function MyChats({fetchAgain}) {
  const {
    setSelectedChats,
    selectedChats,
    user,
    notification,
    setNotification,
    chats,
    setChats,
  } = ChatState();
  const [loggedUser, setLoggedUser] = useState();
  const toast = useToast();
  console.log( user)
  const fetchChats = async () => {
  console.log ( user.token)
  try {
    const url = `https://chatapp-xi08.onrender.com/api/chat`;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.token}`, // Ensure user and token are defined
    };

    const response = await fetch(url, {
      method: "GET",
      headers: headers,
    });

    if (!response.ok) {
      throw new Error("Failed to fetch chats");
    }

    const data = await response.json(); // Extract JSON data from the response
    console.log(data);
    setChats(data);
  } catch (error) {
    console.error(error);
    toast({
      title: "Error Occurred!",
      description: "Failed to Load Chats",
      status: "error",
    });
  }
};

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  }, [fetchAgain]);
  console.log( chats)
  return (
    <Box
      display={{ base: selectedChats ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p={3}
      bg="white"
      w={{ base: "100%", md: "31%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "24px", md: "30px" }}
        fontFamily="Work sans"
        display="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        My Chats
        <GroupChatModal>
          <Button
            display="flex"
            fontSize={{ base: "17px", md: "10px", lg: "17px" }}
            rightIcon={<AddIcon />}
          >
            New Group Chat
          </Button>
        </GroupChatModal>
      </Box>
      <Box
        display="flex"
        flexDir="column"
        p={3}
        bg="#F8F8F8"
        w="100%"
        h="100%"
        borderRadius="lg"
        overflowY="hidden"
      >
        {chats ? (
          <Stack overflowY="scroll">
            {chats.map((chat) => (
              <Box
                onClick={() => setSelectedChats(chat)}
                cursor="pointer"
                bg={selectedChats === chat ? "#38B2AC" : "#E8E8E8"}
                color={selectedChats === chat ? "white" : "black"}
                px={3}
                py={2}
                borderRadius="lg"
                key={chat._id}
              >
                <Text>
                  {!chat.isGroupChat
                    ? getSender(loggedUser, chat.users)
                    : chat.chatName}
                </Text>
                {chat.latestMessage && (
                  <Text fontSize="xs">
                    <b>{chat.latestMessage.sender.name} : </b>
                    {chat.latestMessage.content.length > 50
                      ? chat.latestMessage.content.substring(0, 51) + "..."
                      : chat.latestMessage.content}
                  </Text>
                )}
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  );
}

export default MyChats;
