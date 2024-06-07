import React, { useState } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  FormControl,
  Input,
  useToast,
  Box,
} from "@chakra-ui/react";
import { ChatState } from '../../Context/ChatProvider';
import axios from 'axios';
import UserListItem from '../userAvatar/UserListItem';
function GroupChatModal({ children }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [groupChatName, setGroupChatName] = useState();
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);

    const toast=useToast()
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
        if (!query) {
            return;
        }
        try {
            setLoading(true)
            const config = {
        
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(
        `http://localhost:8000/api/user?search=${search}`,
        config
            );
            console.log(data);
            setSearchResult(data)
            setLoading(false)
        } catch (error) {
            toast({
              title: "Error occurred!",
              description: "Failed to load the search results.",
              status: "error",
              duration: 5000,
              isClosable: true,
              position: "bottom-left",
            });
            setLoading(false);
        }
        
    }
    const handleSubmit = () => {
        
    }
    return(
      <>
        <span onClick={onOpen}>{children}</span>

        <Modal onClose={onClose} isOpen={isOpen} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader
              fontSize="35px"
              
              display="flex"
              justifyContent="center"
            >
              Create Group Chat
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody display="flex" flexDir="column" alignItems="center">
              <FormControl>
                <Input
                  placeholder="Chat Name"
                  mb={3}
                  onChange={(e) => setGroupChatName(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <Input
                  placeholder="Add Users eg: John, Piyush, Jane"
                  mb={1}
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </FormControl>
              <Box w="100%" display="flex" flexWrap="wrap">
                {selectedUsers.map((u) => (
                  <UserBadgeItem
                    key={u._id}
                    user={u}
                    handleFunction={() => handleDelete(u)}
                  />
                ))}
              </Box>
              {loading ? (
                // <ChatLoading />
                <div>Loading...</div>
              ) : (
                searchResult
                  ?.slice(0, 4)
                  .map((user) => (
                    <UserListItem
                      key={user._id}
                      user={user}
                      handleFunction={() => handleGroup(user)}
                    />
                  ))
              )}
            </ModalBody>
            <ModalFooter>
              <Button onClick={handleSubmit} colorScheme="blue">
                Create Chat
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
}

export default GroupChatModal
