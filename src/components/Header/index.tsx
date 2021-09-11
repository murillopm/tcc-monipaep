import { Avatar, Box, Flex, IconButton, Menu, MenuButton, MenuItem, MenuList, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { BsCaretDownFill } from "react-icons/bs"

export function Header() {
  const { user, signOut } = useContext(AuthContext)
  return (
    <Flex 
      as="header" 
      bgColor="white" 
      h="20" 
      justifyContent="space-between" 
      alignItems="center"
      px="6"
      boxShadow="base"
    >
      <Text fontSize="2xl" fontWeight="bold" ml="4">Dashboard</Text>
      <Flex justifyContent="flex-end">
        <Box 
          mr="4" 
          mt="1" 
          textAlign="right" 
        >
          <Text>{user?.user.name}</Text>
          <Text color="gray.500" fontSize="small">{user?.user.email}</Text>
        </Box>
        <Avatar size="md" name={user?.user.name} bg="custom.blue-300"/>
        <Menu>
          <MenuButton 
            as={IconButton} 
            icon={<BsCaretDownFill />} 
            alignSelf="center" 
            bgColor="transparent"
            _hover={{ bg: 'transparent' }}
            _active={{ bg: 'transparent'}}
          />
          <MenuList >
            <MenuItem onClick={signOut}>
              Sair
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
      
    </Flex>
  )
}