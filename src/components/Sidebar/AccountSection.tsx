import { Avatar, Box, Flex, Icon, Stack, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { FiLogOut, FiSettings } from "react-icons/fi"
import { AuthContext } from "../../contexts/AuthContext";
import { NavLink } from "./NavLink";

export function AccountSection() {
  const { signOut } = useContext(AuthContext)
  return (
    <Box w="100%" maxW="100%" mt="auto">
      <Flex 
        alignItems="center" 
        w="calc(100% - 2rem)" 
        mx="4"
        mb="2" 
        bgColor="custom.blue-900"
        p="3"
        rounded="8"
      >
        <Avatar size="sm" name="Murillo Mesquita" />
        <Flex 
          ml="3"  
          direction="column"
          alignItems="flex-start"
        >
          <Text color="white">Murillo Mesquita</Text>
          <Text color="gray.400" fontSize="small">mu.pracucio@gmail.com</Text>
        </Flex>
      </Flex>

      <Stack spacing="2" w="calc(100% - 2rem)" mx="auto">
        <NavLink href="#" icon={FiSettings}>
          Conta
        </NavLink>
        <Box 
          w="100%" 
          role="group"
          display="flex" 
          bgColor="custom.blue-dark"
          align="center" 
          mx="auto"
          _hover= {{ bgColor: "custom.blue-light", cursor: "pointer" }}
          transition= "background"
          transitionDuration="0.2s"
          pl="4" 
          borderRadius={4}
          height="9"
          alignItems="center"
          onClick={() => console.log('click')}
        >
          <Icon 
            as={FiLogOut} 
            fontSize="1.125rem"
            color="custom.gray-light" 
            transition= "color"
            transitionDuration="0.2s"
            _groupHover={{ color: "white" }}
          />
          <Text 
            ml="3"
            pt="2px"
            fontWeight="medium"
            color="custom.gray-light"
            transition= "color"
            transitionDuration="0.2s"
            _groupHover={{ color: "white" }}
            align="center"
          >
            Sair
          </Text>
        </Box>
      </Stack>
    </Box>
  )
}