import React from "react";
import { Avatar, HStack, SlideFade, Stack, Text } from "@chakra-ui/react";

interface IBalloonProps {
  side: "left" | "right";
  message: string;
}

const Balloon: React.FC<IBalloonProps> = ({ side, message }) => {
  return (
    <SlideFade in offsetY="20px">
      <HStack
        justifyContent={side === "left" ? "flex-start" : "flex-end"}
        alignItems={side === "left" ? "flex-start" : "flex-end"}
      >
        {side === "left" && (
          <Stack position={"relative"}>
            <Avatar
              size={"sm"}
              name="Lu"
              shadow={"lg"}
              src="https://upload.wikimedia.org/wikipedia/pt/d/d2/Lu_do_magalu.png"
            />
            <Stack
              w={0}
              h={0}
              position={"absolute"}
              left={7}
              top={0}
              borderTopWidth={25}
              borderTopStyle="solid"
              borderTopColor={"white"}
              borderBottomWidth={0}
              borderLeftWidth={10}
              borderRightWidth={10}
              borderLeftStyle="solid"
              borderRightStyle="solid"
              borderLeftColor="transparent"
              borderRightColor="transparent"
              transform="translateX(50%) rotate(-270deg)"
              zIndex={10}
            />
          </Stack>
        )}

        <Stack
          w={"65%"}
          alignItems={"flex-start"}
          bg={side === "left" ? "white" : "#0086ff"}
          color={side === "right" ? "white" : undefined}
          shadow={"lg"}
          rounded={"lg"}
          px={2}
          py={1}
          mx={3}
          position={"relative"}
        >
          <Text
            textAlign={"left"}
            dangerouslySetInnerHTML={{ __html: message }}
          />
        </Stack>

        {side === "right" && (
          <Stack position={"relative"}>
            <Stack
              w={0}
              h={0}
              position={"absolute"}
              left={-9}
              bottom={0}
              borderTopWidth={25}
              borderTopStyle="solid"
              borderTopColor={"magalu.500"}
              borderBottomWidth={0}
              borderLeftWidth={10}
              borderRightWidth={10}
              borderLeftStyle="solid"
              borderRightStyle="solid"
              borderLeftColor="transparent"
              borderRightColor="transparent"
              transform="translateX(50%) rotate(-90deg)"
              zIndex={10}
            />
            <Avatar size={"sm"} shadow={"lg"} name="Heytor Cavalcanti" />
          </Stack>
        )}
      </HStack>
    </SlideFade>
  );
};

export default Balloon;
