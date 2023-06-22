import { useState } from "react";
import { ChakraProvider, HStack, IconButton, SlideFade, extendTheme } from "@chakra-ui/react";
import { FiMessageCircle } from "react-icons/fi";

import Chat from "./components/Chat";

import "./App.css";

function App() {
  const [showChat, setShowChat] = useState<boolean>(false);

  const toogleChat = () => {
    setShowChat(prevState => !prevState);
  }

  const theme = extendTheme({
    colors: {
      'magalu': {
        500: '#0086ff'
      },
    },
  })

  return (
    <ChakraProvider theme={theme}>
      <div id="app">
        <HStack justifyContent={"flex-end"} alignItems={"flex-end"} p={5}>
          <SlideFade in={showChat} offsetY="20px">
            <Chat toogleChat={toogleChat} />
          </SlideFade>
          <IconButton
            aria-label="Send message"
            colorScheme="whatsapp"
            rounded={"full"}
            icon={<FiMessageCircle size={25} />}
            shadow={"sm"}
            size={"lg"}
            onClick={toogleChat}
          />
        </HStack>
      </div>
    </ChakraProvider>
  );
}

export default App;
