import {
  Box,
  Tooltip,
  Button,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Avatar } from "@chakra-ui/react";
import { ChatState } from "../../Context/ChatProvider";
import ProfileModal from "./ProfileModal";
function SideDrawer() {
  const [results, setResult] = useState([]);
  const [search, setSearch] = useState("");
  const [loadingChat, setLoadingChat] = useState(false);

  const { user } = ChatState();
  return (
    <Box
      d="flex"
      justifyContent="space-between"
      alignItems="center"
      bg="white"
      w="100%"
      p="5px 10px 5px 1-px"
      borderWidth="5px"
      display="flex"
    >
      <Tooltip label="Search users to Chat" hasArrow placement="bottom">
        <Box as="span">
          <Button varient="ghost">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
            <Text d={{ base: "none", md: "flex" }} px="4"></Text>
          </Button>
        </Box>
      </Tooltip>
      <Text>Chat App</Text>
      <div>
        <Menu>
          <MenuButton p={1}>
            <BellIcon />

            {/* {<MenuList></MenuList>} */}
          </MenuButton>
        </Menu>
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />} p={1}>
            <Avatar
              size="sm"
              cursor="pointer"
              name={user.name}
              src={user.pic}
            />
          </MenuButton>
          <MenuList>
            <ProfileModal user={user}>
              <MenuItem>My Profile</MenuItem>
            </ProfileModal>
            <MenuDivider></MenuDivider>
            <MenuItem>Logout</MenuItem>
          </MenuList>
        </Menu>
      </div>
    </Box>
  );
}

export default SideDrawer;
