import { Box, Flex } from "@chakra-ui/react";
import { ReactNode, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Header } from "../Header";
import { Sidebar } from "../Sidebar";

interface DashboardLayoutProps {
  children: ReactNode
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { signOut } = useContext(AuthContext)
  
  return (
    <Flex w="100vw" h="100vh" bgColor="gray.100">
      <Sidebar />
      <Flex direction="column" width="calc(100% - 256px)">
        <Header />
        {children}
      </Flex>
    </Flex>
  )
}

export default DashboardLayout