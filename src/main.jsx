import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import HomePage from "./Pages/HomePage";
import ChatPage from "./Pages/ChatPage";
import ChatProvider from "./Context/ChatProvider";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
     <HomePage/>
    ),
  },
  {
    path: "/user/login",
    element:<ChatPage/>
  },
]);

createRoot(document.getElementById("root")).render(
  <ChatProvider>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </ChatProvider>
);
