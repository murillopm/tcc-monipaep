import { useState, useCallback, ChangeEvent, useMemo, useEffect, useContext } from "react";
import Head from "next/head"
import Router from "next/router"
import { debounce } from "ts-debounce"
import { format, parseISO } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";

import { 
  Badge, 
  Box, 
  Flex, 
  Heading, 
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  Table, 
  Tbody, 
  Td, 
  Text, 
  Th, 
  Thead, 
  Tr, 
  Select, 
  Spinner,
  VStack,
} from "@chakra-ui/react";
import { MdSearch } from 'react-icons/md'
import { IoChevronBack } from "react-icons/io5"

import { withSSRAuth } from "../../utils/withSSRAuth";
import { Pagination } from "../../components/Pagination";
import DashboardLayout from "../../components/Layouts/DashboardLayout";
import { api } from "../../services/apiClient";
import { AuthContext } from "../../contexts/AuthContext";

type SystemUser = {
  id: string;
  name: string;
  CPF: string;
  email: string;
  department: string;
  createdAt: string;
}

export default function Account() {
  const [accountDetails, setAccountDetails] = useState({} as SystemUser)
  const [isLoading, setIsLoading] = useState(true)
  const [isUpdating, setIsUpdating] = useState(false)
  const { user } = useContext(AuthContext)

  useEffect(() => {
    async function getAccountDetails() {
      const { data } = await api.get<SystemUser[]>('/systemuser/', {
        params: { id: user?.user.id }
      })
      const formattedData: SystemUser[] = data.map(user => {
        const formattedDate = format(parseISO(user.createdAt), 'Pp', { locale: ptBR })
        return {
          ...user,
          createdAt: formattedDate
        }
      })
      setAccountDetails(formattedData[0])
      setIsLoading(false)
    }
    getAccountDetails()
  }, [isUpdating, user])

  return (
    <>
      <Head>
        <title>MoniPaEp | Detalhes do usuário</title>
      </Head>
      <Flex h="100%" w="100%" bgColor="white" borderRadius="4" direction="column" >
        <Heading ml="8" my="6">
          Detalhes do usuário
        </Heading>
        { isLoading ? (
          <Box w="100%" h="100%" display="flex" justifyContent="center" alignItems="center">
            <Spinner size="lg"/>
          </Box>
        ) : (
          <Flex pl="5">
            <Icon 
              as={IoChevronBack} 
              fontSize="22px" 
              mt="9" 
              mr="6"
              _hover={{ cursor: 'pointer' }}
              onClick={() => Router.back()}
            />
            <VStack mt="8" alignItems="flex-start">
              <Flex>
                <Text fontWeight="bold">Nome:&nbsp;</Text>
                <Text>{accountDetails?.name}</Text>
              </Flex>
              <Flex>
                <Text fontWeight="bold">CPF:&nbsp;</Text>
                <Text>{accountDetails.CPF}</Text>
              </Flex>
              <Flex>
                <Text fontWeight="bold">Email:&nbsp;</Text>
                <Text>{accountDetails.email}</Text>
              </Flex>
              <Flex>
                <Text fontWeight="bold">Departamento:&nbsp;</Text>
                <Text>{accountDetails.department}</Text>
              </Flex>
              <Flex>
                <Text fontWeight="bold">Criado em:&nbsp;</Text>
                <Text>{accountDetails.createdAt}</Text>
              </Flex>
            </VStack>
          </Flex>
        )}
      </Flex>
    </>
  )
}

Account.layout = DashboardLayout

export const getServerSideProps = withSSRAuth(async (ctx) => { 
  return { props: {} }
})