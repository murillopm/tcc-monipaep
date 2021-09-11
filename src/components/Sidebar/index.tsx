import { Box, Flex, Heading, Icon } from "@chakra-ui/react";
import { AiOutlineDatabase } from "react-icons/ai"
import { BiBookHeart } from "react-icons/bi"
import { FiUsers } from "react-icons/fi"
import { HiOutlineClipboardList } from "react-icons/hi"

import { Can } from "../Can";
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
      boxShadow="base"
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
        <NavLink href="/patients" icon={FiUsers} >
          Pacientes
        </NavLink>
        <NavLink href="/adminpanel" icon={AiOutlineDatabase} >
          Ocorrências de doenças
        </NavLink>
        <NavLink href="#" icon={HiOutlineClipboardList} >
          Ocorrências de sintomas
        </NavLink>
        <NavLink href="#" icon={AiOutlineDatabase} >
          Doenças
        </NavLink>
        <NavLink href="#" icon={HiOutlineClipboardList} >
          Sintomas
        </NavLink>
      </NavSection>
      <Can roles={["local.admin", "general.admin"]}>
        <NavSection title="PAINEL DE ADMINISTRADOR">
          <NavLink href="#" icon={BiBookHeart}>
            Usuários do sistema
          </NavLink>
        </NavSection>
      </Can>
    </Box>
  )
}