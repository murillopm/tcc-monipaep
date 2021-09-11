import { useState, ChangeEvent, useCallback } from "react";
import NextLink from 'next/link'
import { debounce } from "ts-debounce"

import { withSSRAuth } from "../../utils/withSSRAuth";

import DashboardLayout from "../../components/Layouts/DashboardLayout";
import { Pagination } from "../../components/Pagination";
import { 
  Badge, 
  Box, 
  Button,
  Flex, 
  Heading, 
  Icon,
  Input,
  InputGroup,
  Table, 
  Tbody, 
  Td, 
  Text, 
  Th, 
  Thead, 
  Tr, 
  Select, 
  Spinner,
  InputRightElement,
  IconButton,
} from "@chakra-ui/react";
import { MdSearch } from 'react-icons/md'
import { FaSearchPlus } from 'react-icons/fa'
import { usePatients } from "../../hooks/usePatients";

function getBadgeColor(status: string) {
  if(status === "Saudável") {
    return "green"
  } else if(status === "Suspeito") {
    return "yellow"
  } else if(status === "Infectado") {
    return "red"
  } else {
    return "purple"
  }
}

export default function Patients() {
  const [page, setPage] = useState(1)
  const [filter, setFilter] = useState('name')
  const [search, setSearch] = useState('')
  const { data , isLoading, isFetching, error } = usePatients({ page, filter: [filter, search]})

  function handleChangeInput(event: ChangeEvent<HTMLInputElement>) {
    setPage(1)
    setSearch(event.target.value)
  }

  const debouncedChangeInputHandler = useCallback(
    debounce(handleChangeInput, 600)
  , []) 
  
  return (
    <Flex h="100%" w="auto" mx="6" mt="6" bgColor="white" borderRadius="4" direction="column" boxShadow="xl">
      <Heading ml="8" my="6">
        Pacientes
        {!isLoading && isFetching && <Spinner ml="4"/>}
      </Heading>
      { isLoading ? (
        <Box w="100%" h="100%" display="flex" justifyContent="center" alignItems="center">
          <Spinner size="lg"/>
        </Box>
      ) : error ? (
        <Box w="100%" display="flex" justifyContent="center" alignItems="center">
          <Text>Erro ao carregar os dados</Text>
        </Box>
      ) : (
        <>
          <Flex mx="8" mb="4">
            <Select w="32" borderRightRadius="0" onChange={e => {setFilter(e.target.value)}}>
              <option value="name">Nome</option>
              <option value="cpf">CPF</option>
              <option value="neighborhood">Bairro</option>
              <option value="status">Status</option>
            </Select>
            <Input placeholder="Buscar..." w="42" borderRadius="0" onChange={debouncedChangeInputHandler}/>
            <IconButton 
              aria-label="Buscar no banco de dados" 
              icon={<MdSearch fontSize="20" color="white" />} 
              borderLeftRadius="0"
              bgColor="custom.blue-600"
              _hover={{
                'bgColor': 'custom.blue-500'
              }}
              disabled
              _disabled={{
                cursor: 'default',
                bgColor: 'custom.blue-600'
              }}
            />
          </Flex>
          <Flex direction="column" w="100%" overflow="auto" px="8">
            <Table size="lg" w="100%" overflow="scroll" border="1px" borderColor="gray.200" boxShadow="md">
              <Thead bgColor="gray.200">
                <Tr>
                  <Th>Nome</Th>
                  <Th>CPF</Th>
                  <Th>Data de nascimento</Th>
                  <Th>Bairro</Th>
                  <Th>Plano de saúde</Th>
                  <Th>Status</Th>
                  <Th></Th>
                </Tr>
              </Thead>

              <Tbody>
                { data?.patients.map(patient => (
                  <Tr key={patient.id} _hover={{ bgColor: 'gray.50' }}>
                    <Td>
                      <Box textAlign="left">
                        <Text>{patient.name}</Text>
                        <Text fontSize="sm" color="gray.500">{patient.email}</Text>
                      </Box>
                    </Td>
                    <Td w="100">
                      <Text>{patient.CPF}</Text>
                    </Td>
                    <Td>
                      <Text>{patient.birthdate}</Text>
                    </Td>
                    <Td>
                      <Text>{patient.neighborhood}</Text>
                    </Td>
                    <Td>
                      <Badge colorScheme={patient.hasHealthPlan ? 'green' : 'red'}>
                        {patient.hasHealthPlan ? 'Possui' : 'Não possui'}
                      </Badge>
                    </Td>
                    <Td>
                      <Badge colorScheme={getBadgeColor(patient.status)}>
                        {patient.status}
                      </Badge>
                    </Td>
                    <Td>
                      <NextLink href="#" passHref>
                        <Button 
                          as="a" 
                          colorScheme="pink"
                          size="sm" 
                          fontSize="sm" 
                          leftIcon={<Icon as={FaSearchPlus} fontSize="16"/>}
                        >
                          Mais detalhes
                        </Button>
                      </NextLink>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
            <Box w="100%" mt="4">
              <Pagination 
                currentPage={page} 
                totalRegisters={data?.totalPatients} 
                onPageChange={setPage}
              />
            </Box>
          </Flex>
        </>
      )}
    </Flex>
  )
}

Patients.layout = DashboardLayout

export const getServerSideProps = withSSRAuth(async (ctx) => {
  // const apiClient = setupAPIClient(ctx)
  // const response = await apiClient.get('/systemuser/me')

  // console.log(response.data)
  
  return {
    props: {}
  }
})