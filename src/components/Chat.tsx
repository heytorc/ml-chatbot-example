import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Stack,
  VStack,
  IconButton,
  HStack,
  Textarea,
  Image,
} from "@chakra-ui/react";
import { FiX, FiRotateCw, FiSend, FiMaximize2 } from "react-icons/fi";
import { FaRegWindowMinimize } from "react-icons/fa";
import Balloon from "./Balloon";

interface IMessages {
  message: string;
  user: string;
  position: "left" | "right";
}

interface IChatProps {
  toogleChat(): void;
}

const Chat: React.FC<IChatProps> = ({ toogleChat }) => {
  const [messages, setMessages] = useState<IMessages[]>([
    {
      message:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Neque, asperiores illo esse recusandae in rerum quam nihil et quod, eligendi dolorem? Repudiandae a praesentium perspiciatis! Ipsam illo odit molestias! Excepturi.",
      position: "left",
      user: "Lu",
    },
  ]);
  const [messageToSend, setMessageToSend] = useState<string>();

	const [chat, setChat] = useState({
		isMinimized: false,
		isOpen: false
	});

  const textInput = useRef<HTMLTextAreaElement>(null);
	const conversationContent = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (conversationContent.current) {
			const chat = conversationContent.current;
			conversationContent.current.scrollTop = chat.scrollHeight;
		}
	}, [messages])

  const handleSendMessage = useCallback(() => {
    if (messageToSend) {
      const cloneMessages = [...messages];

      if (textInput.current) {
        textInput.current.value = "";
      }

      cloneMessages.push({
        message: `${messageToSend}`,
        position: "right",
        user: "Heytor Cavalcanti",
      });

      setMessages(cloneMessages);
      setMessageToSend(undefined);
    }
  }, [messageToSend, messages]);

	const minimizeChat = () => {
		if (conversationContent.current) {
			if (chat.isMinimized) {
				conversationContent.current.style.height = '400px';
				conversationContent.current.style.padding = '.8rem';

				setChat(prevState => ({ ...prevState, isMinimized: false }))
			} else {
				console.log(conversationContent.current.style.height);
				// conversationContent.current.style.transition = '.5s ease-in-out';
				conversationContent.current.style.height = '0px';
				conversationContent.current.style.padding = '0px';

				setChat(prevState => ({ ...prevState, isMinimized: true }))
			}

		}
	}

  return (
    <VStack
      w={400}
			maxH={600}
      bg={"white"}
      shadow={"xl"}
      rounded={"lg"}
      justifyContent={"space-between"}
      gap={0}
    >
      {/* Header */}
      <HStack
        px={3}
        py={4}
        w={"full"}
        justifyContent={"space-between"}
        borderBottom={"4px solid"}
        borderColor={"blue.400"}
      >
        <Image
          width={100}
          src="https://logodownload.org/wp-content/uploads/2014/06/magalu-logo-1.png"
        />
        <HStack>
          <IconButton
            size={"sm"}
            color={"magalu.500"}
            variant={"ghost"}
            aria-label="Reload chat"
            icon={<FiRotateCw size={20} />}
          />
          <IconButton
            size={"sm"}
            color={"magalu.500"}
            variant={"ghost"}
            aria-label="Minimize chat"
            icon={chat.isMinimized ? <FiMaximize2 size={20} /> : <FaRegWindowMinimize size={20} />}
            onClick={minimizeChat}
          />
          <IconButton
            size={"sm"}
            color={"magalu.500"}
            variant={"ghost"}
            aria-label="Close chat"
            icon={<FiX size={20} />}
            onClick={toogleChat}
          />
        </HStack>
      </HStack>

      {/* Conversation */}
      <Stack
				ref={conversationContent}
        w={"full"}
        bg={"blackAlpha.50"}
        p={2}
        overflowY={"scroll"}
				transition={'.5s ease-in-out'}
				height={400}
      >
        {messages.map((message, index) => (
          <Balloon
            key={`message_${index}`}
            side={message.position}
            message={message.message}
          />
        ))}
      </Stack>

      {/* Form */}
      <Stack
        bg={"gray.200"}
        borderTop={"3px solid"}
        borderTopColor={"gray.300"}
        borderBottomRadius={"lg"}
        w={"full"}
        p={3}
      >
        <HStack>
          <Textarea
            ref={textInput}
            bg={"white"}
            size={"sm"}
            rounded={"lg"}
            placeholder="Digite sua mensagem"
            resize={"none"}
            onChange={(e) => {
							console.log(e.target.value);
							const value = e.target.value.replace(/\n/g, '<br />');
              setMessageToSend(value);
            }}
          />
          <IconButton
            aria-label="Send message"
						colorScheme="blue"
            bg={'magalu.500'}
            rounded={"full"}
            icon={<FiSend size={20} style={{ marginLeft: -3, marginTop: 1 }} />}
            shadow={"sm"}
            onClick={handleSendMessage}
          />
        </HStack>
      </Stack>
    </VStack>
  );
};

export default Chat;
