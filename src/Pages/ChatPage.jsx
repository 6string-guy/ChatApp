import React, {useState} from "react";
import { ChatState } from "../Context/ChatProvider";
import SideDrawer from "../components/miscellaneous/SideDrawer.jsx";
import { Box } from "@chakra-ui/react";
import MyChats from "../components/MyChats.jsx";
import ChatBox from "../components/ChatBox.jsx";

const ChatPage = () => {
  const { user } = ChatState();
  const [fetchAgain, setFetchAgain] = useState();

  return (
    <div className="w-full">
      {user && <SideDrawer />}
      <Box
        display="flex"
        justifyContent="space-between"
        w="100%"
        h="91.5vh"
        p="10px"
      >
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>}
      </Box>
    </div>
  );
};

export default ChatPage;
