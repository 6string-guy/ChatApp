import React,{useState} from 'react'
import { useToast } from '@chakra-ui/react'
import { ChatState } from "../Context/ChatProvider";
import {Box} from '@chakra-ui/react'

function MyChats() {
  const {
    setSelectedChat,
    user,
    notification,
    setNotification,
    chats,
    setChats,
  } = ChatState();
  const [loggedUser, setLoggedUser] = useState();
  const toast= useToast()
  return (
    <Box>
      
      </Box>
  )
}

export default MyChats
