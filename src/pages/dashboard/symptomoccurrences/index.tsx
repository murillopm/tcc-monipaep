import { useState, useCallback, ChangeEvent, useMemo } from "react";
import Head from "next/head"
import NextLink from "next/link"
import { debounce } from "ts-debounce"
import DashboardLayout from "../../../components/Layouts/DashboardLayout";
import { 
  Box, 
  Button,
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
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import { BiPencil, BiTrash } from 'react-icons/bi'
import { MdSearch } from 'react-icons/md'
import { RiAddLine } from 'react-icons/ri'

import { withSSRAuth } from "../../../utils/withSSRAuth";
import { Pagination } from "../../../components/Pagination";
import { useSymptomOccurrences } from "../../../hooks/useSymptomOccurrences";


export default function SymptomOccurrences() {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  // const [symptomToBeEdited, setSymptomToBeEdited] = useState<Symptom | undefined>(undefined)
  const { data, isLoading, isFetching, error, refetch } = useSymptomOccurrences({ page, filter: search })
  // const { 
  //   isOpen: isOpenEditModal, 
  //   onOpen: onOpenEditModal, 
  //   onClose: onCloseEditModal 
  // } = useDisclosure()

  const handleChangeInput = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setPage(1)
    setSearch(event.target.value)
  }, [])

  const debouncedChangeInputHandler = useMemo(
    () => debounce(handleChangeInput, 600)  
  , [handleChangeInput]) 

  // function handleEditSymptom(symptom: Symptom) {
  //   setSymptomToBeEdited(symptom)
  //   onOpenEditModal()
  // }

  
  return (
    <>
      <Head>
        <title>MoniPaEp | Ocorrências de sintomas</title>
      </Head>

      <Flex h="100%" w="100%" bgColor="white" borderRadius="4" direction="column" >
        <Heading ml="8" my="6">
          Ocorrências de sintomas
          { !isLoading && isFetching && <Spinner ml="4"/> }
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

            {/* { symptomToBeEdited && (
              <SymptomEditModal 
                isOpen={isOpenEditModal} 
                onClose={onCloseEditModal} 
                symptom={symptomToBeEdited.symptom}
                refetchList={refetch}
              />
            )} */}

            <Flex mx="8" mb="8" justifyContent="space-between" alignItems="center">
              <InputGroup w="30">
                <InputLeftElement>
                  <Icon as={MdSearch} fontSize="xl" color="gray.400"/>
                </InputLeftElement>
                <Input placeholder="Filtrar pelo nome..." onChange={debouncedChangeInputHandler}/>
              </InputGroup>  
            </Flex>

            <Flex direction="column" w="100%" overflow="auto" px="8">
              { data?.totalSymptomOccurrences === 0 ? (
                <Text mt="2">
                  { search === '' ? 
                    'Não existem ocorrências de sintomas em aberto até o momento.' : 
                    'A busca não encontrou nenhuma ocorrência em aberto desse paciente.'
                  }
                </Text>
              ) : (
                <>
                  <Table w="100%" border="1px" borderColor="gray.200" boxShadow="md" mb="4">
                    <Thead bgColor="gray.200">
                      <Tr>
                        <Th>Paciente</Th>
                        <Th>Inicio dos sintomas</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      { data?.symptomOccurrences.map(symptomOccurrence => (
                        <Tr key={symptomOccurrence.id} _hover={{ bgColor: 'gray.50' }}>
                          <Td>
                            <Box textAlign="left">
                              <NextLink 
                                href={`/dashboard/patients/unassignedsymptoms/${symptomOccurrence.patient_id}`} 
                                passHref
                              >
                                <Link>{symptomOccurrence.patient.name}</Link>
                              </NextLink>
                              <Text fontSize="sm" color="gray.500">
                                {symptomOccurrence.patient.email}
                              </Text>
                            </Box>
                          </Td>
                          <Td>
                            {symptomOccurrence.registered_date}
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>

                  <Box w="100%" mt="3" mb="5">
                    <Pagination 
                      currentPage={page} 
                      totalRegisters={data?.totalSymptomOccurrences} 
                      onPageChange={setPage}
                    />
                  </Box>
                </>
              )}
            </Flex>
          </>
        )}
      </Flex>
    </>
  )
}

SymptomOccurrences.layout = DashboardLayout

export const getServerSideProps = withSSRAuth(async (ctx) => { 
  return { props: {} }
})