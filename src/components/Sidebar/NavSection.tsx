import { Box, Flex, Icon, Stack, Text } from "@chakra-ui/react";
import { ReactNode } from "react";

interface NavSectionProps {
  title: string;
  children: ReactNode;
}

export function NavSection({ title, children }: NavSectionProps) {
  return (
    <Box w="100%" mt="10" >
      <Text 
        fontSize="0.8rem" 
        color="#0597FF" 
        fontWeight="medium"
        pl="4"
        mb="2"
      >
        {title}
      </Text>
      <Stack spacing="2" width="95%" mx="auto">
        {children}
      </Stack>
    </Box>
  )
}