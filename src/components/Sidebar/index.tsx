import { Box, Flex, Heading, Icon, Image, Link, Text } from "@chakra-ui/react";
import { BiBookHeart } from "react-icons/bi"
import { ActiveLink } from "../ActiveLink";
import { NavLink } from "./NavLink";
import { NavSection } from "./NavSection";

export function Sidebar() {
  return (
    <Box 
      as="aside" 
      w="64" 
      h="100%" 
      bgColor="custom.blue-dark"
      display="flex"
      flexDir="column"
      justifyContent="flex-start"
      alignItems="center"
    >
      <Flex align="center" mt="5">
        <Icon as={BiBookHeart} color="custom.blue-logo" height="30px" width="30px" mr="2"/>
        <Heading 
          color="custom.blue-logo"
          fontSize="3xl" 
          fontWeight="500" 
          fontFamily="Comfortaa" 
          pt="6px"
        >
          MoniPaEp
        </Heading>
      </Flex>

      <NavSection title="GERENCIAMENTO">
        <NavLink href="/dashboard" icon={BiBookHeart} >
          Pacientes
        </NavLink>
        <NavLink href="/adminpanel" icon={BiBookHeart} >
          Ocorrências de doenças
        </NavLink>
        <NavLink href="#" icon={BiBookHeart} >
          Ocorrências de sintomas
        </NavLink>
        <NavLink href="#" icon={BiBookHeart} >
          Doenças
        </NavLink>
        <NavLink href="#" icon={BiBookHeart} >
          Sintomas
        </NavLink>
      </NavSection>
    </Box>
  )
}