import { FormControl } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Box, Text } from "@chakra-ui/layout";
//import "./styles.css";
import { IconButton, Spinner, useToast } from "@chakra-ui/react";
import { getSender, getSenderFull } from "./config/ChatLogics.js";
import { useEffect, useState } from "react";
import axios from "axios";
import { ArrowBackIcon } from "@chakra-ui/icons";
import ProfileModal from "./miscellaneous/ProfileModal";
//import ScrollableChat from "./ScrollableChat";
//import Lottie from "react-lottie";
//import animationData from "../animations/typing.json";

//import io from "socket.io-client";
//import UpdateGroupChatModal from "./miscellaneous/UpdateGroupChatModal";
import { ChatState } from "../Context/ChatProvider";



const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);
  const toast = useToast();

 
  const {
    setSelectedChats,
    selectedChats,
    user,
    notification,
    setNotification,
    chats,
    setChats,
  } = ChatState();
  const sendMessage = () => {
    
  }
  const fetchMessages = () => {
    
  }
  const typingHandler = (e) => {
    setNewMessage(e.target.value)
    
  }
 

  return (
    
      <>
        {selectedChats ? (
          <>
            <Text
              fontSize={{ base: "28px", md: "30px" }}
              pb={3}
              px={2}
              w="100%"
              //fontFamily="Work sans"
              display ="flex"
              justifyContent={{ base: "space-between" }}
              alignItems="center"
            >
              <IconButton
                display={{ base: "flex", md: "none" }}
                icon={<ArrowBackIcon />}
                onClick={() => setSelectedChats("")}
              />
              {messages &&
                (!selectedChats.isGroupChat ? (
                  <>
                    {getSender(user, selectedChats.users)}
                    <ProfileModal
                      user={getSenderFull(user, selectedChats.users)}
                    />
                  </>
                ) : (
                  <>
                    {selectedChats.chatName.toUpperCase()}
                    <UpdateGroupChatModal
                      fetchMessages={fetchMessages}
                      fetchAgain={fetchAgain}
                      setFetchAgain={setFetchAgain}
                    />
                  </>
                ))}
            </Text>
            <Box
              display="flex"
              flexDir="column"
              justifyContent="flex-end"
              p={3}
              bg="#E8E8E8"
              w="100%"
              h="100%"
              borderRadius="lg"
              overflowY="hidden"
            >
              {loading ? (
                <Spinner
                  size="xl"
                  w={20}
                  h={20}
                  alignSelf="center"
                  margin="auto"
                />
              ) : (
                <div className="messages">
                  Messages
                  {/* <ScrollableChat messages={messages} /> */}
                </div>
              )}

              <FormControl
                onKeyDown={sendMessage}
                id="first-name"
                isRequired
                mt={3}
              >
                {istyping ? (
                  <div>
                    <Lottie
                      options={defaultOptions}
                      // height={50}
                      width={70}
                      style={{ marginBottom: 15, marginLeft: 0 }}
                    />
                  </div>
                ) : (
                  <></>
                )}
                <Input
                  variant="filled"
                  bg="#E0E0E0"
                  placeholder="Enter a message.."
                  value={newMessage}
                  onChange={typingHandler}
                />
              </FormControl>
            </Box>
          </>
        ) : (
          // to get socket.io on same page
          <Box display="flex" alignItems="center" justifyContent="center" h="100%">
            <Text fontSize="3xl" pb={3} fontFamily="Work sans">
              Click on a user to start chatting
            </Text>
          </Box>
        )}
      
    </>
  );
};

export default SingleChat;
