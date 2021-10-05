import { useEffect, useState } from "react";
import Router from "next/router"
import Head from "next/head"
import { registerLocale } from "react-datepicker";
import ptBR from "date-fns/locale/pt-BR";
import { 
  Box, 
  Divider,
  Flex, 
  Icon,
  Table, 
  Tbody, 
  Td, 
  Text, 
  Th, 
  Thead, 
  Tr,  
  Spinner,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { IoChevronBack } from "react-icons/io5"

import { withSSRAuth } from "../../../../../utils/withSSRAuth";
import { PatientDataWrapper } from "../../../../../components/Layouts/PatientDataWrapper";
import DashboardLayout from "../../../../../components/Layouts/DashboardLayout";
import { usePatientDiseaseOccurrence } from "../../../../../hooks/usePatientDiseaseOccurrence";

type GetDiseasesResponse = {
  diseases: {
    name: string;
  } []
}

type DiseaseList = {
  diseaseName: string;
  selected: boolean;
}
interface PatientDiseaseOccurrenceProps {
  patientId: string;
  occurrenceId: string;
}

registerLocale('ptBR', ptBR)
export default function PatientDiseaseOccurrence({ patientId, occurrenceId }: PatientDiseaseOccurrenceProps) {
  const [startDate, setStartDate] = useState<Date | undefined>(undefined)
  const [diseaseList, setDiseaseList] = useState<DiseaseList[] | undefined>(undefined)
  const [diseaseStatus, setDiseaseStatus] = useState('Suspeito')
  const [diagnosis, setDiagnosis] = useState('')
  const [isPosting, setIsPosting] = useState(false)
  const { data, isLoading, isFetching, error,  } = usePatientDiseaseOccurrence({ occurrenceId })
  const toast = useToast()

  useEffect(() => {
    if(data) {
      setStartDate(new Date(data.occurrenceDetails.date_start))
    }
  }, [isLoading])

  function handleBackClick() {
    Router.back()
  }

  return (
    <PatientDataWrapper id={patientId} isFetching={isFetching} isLoading={isLoading}>
      <Head>
        <title>MoniPaEp | Detalhes da ocorrência de doença</title>
      </Head>
      <Flex h="100%" w="100%" bgColor="white" borderRadius="4" direction="column">
        { isLoading ? (
          <Box w="100%" h="100%" display="flex" justifyContent="center" alignItems="center">
            <Spinner size="lg" mt="10"/>
          </Box>
        ) : error ? (
          <Box w="100%" display="flex" justifyContent="center" alignItems="center">
            <Text>Erro ao carregar os dados</Text>
          </Box>
        ) : (
          <>
            <Flex w="100%" pl="5" pr="8" justifyContent="space-between">
              { data?.symptomsList.length === 0 ? (
                <Text mt="9">
                  Não existem ocorrências de sintomas registrados para essa ocorrência de doença.
                </Text>
              ) : (
                <>
                  <Flex maxW="26%" w="100%">
                    <Icon 
                      as={IoChevronBack} 
                      fontSize="22px" 
                      mt="8" 
                      mr="6" 
                      onClick={handleBackClick}
                      _hover={{ cursor: 'pointer' }}
                    />
                    <Flex direction="column">
                      <Text w="100%" mt="8" mb="5" fontWeight="semibold" fontSize="lg">
                        Detalhes da ocorrência de doença
                      </Text>
                      <VStack w="100%" alignItems="flex-start">
                        <Text mr="3"><b>Doença:</b> {data?.occurrenceDetails.disease_name}</Text>
                        <Text mr="3"><b>Data de início:</b> {data?.occurrenceDetails.date_start_formatted}</Text>
                        <Text mr="3"><b>Data de término:</b> {data?.occurrenceDetails.date_end_formatted ?? 'Em andamento'}</Text>
                        <Text mr="3"><b>Diagnóstico:</b> {data?.occurrenceDetails.diagnosis}</Text>
                        <Text mr="3"><b>Status:</b> {data?.occurrenceDetails.status}</Text>
                      </VStack>
                    </Flex>
                  </Flex>
                  <Box mt="4" minH="calc(100vh - 156px)">
                    <Divider orientation="vertical" mx="6" size="100%"/>
                  </Box>
                  <Box maxW="37%" w="100%">
                    <Text fontSize="lg" mb="5" mt="8" fontWeight="semibold">
                      Histórico de sintomas da ocorrência
                    </Text>
                    <Table w="100%" border="1px" borderColor="gray.200" boxShadow="md">
                      <Thead bgColor="gray.200">
                        <Tr>
                          <Th>Sintoma</Th>
                          <Th>Data da ocorrência</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        { data?.symptomsList.map(symptomOccurrence => (
                          <Tr key={symptomOccurrence.id} _hover={{ bgColor: 'gray.50' }}>
                            <Td>{symptomOccurrence.symptom_name}</Td>
                            <Td>{symptomOccurrence.registered_date}</Td>
                          </Tr>
                        ))}
                      </Tbody>
                    </Table>
                  </Box>
                  <Box mt="4" minH="calc(100vh - 156px)">
                    <Divider orientation="vertical" mx="6" size="100%"/>
                  </Box>
                  <Box maxW="37%" w="100%">
                    <Text fontSize="lg" mb="5" mt="8" fontWeight="semibold">
                      Histórico de movimentação da ocorrência
                    </Text>
                    { data && data.movementHistory.length === 0 ? (
                      <Text>
                        Não existem movimentações registradas para esta ocorrência.
                      </Text>
                    ) : (
                      <Table w="100%" border="1px" borderColor="gray.200" boxShadow="md">
                        <Thead bgColor="gray.200">
                          <Tr>
                            <Th>Descrição</Th>
                            <Th>Data</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          { data?.movementHistory.map(movement => (
                            <Tr key={movement.id} _hover={{ bgColor: 'gray.50' }}>
                              <Td>{movement.description}</Td>
                              <Td>{movement.date}</Td>
                            </Tr>
                          ))}
                        </Tbody>
                      </Table>
                    )}
                  </Box>
                </>
              )}
            </Flex>
          </>
        )}
      </Flex>
    </PatientDataWrapper>
  )
}

PatientDiseaseOccurrence.layout = DashboardLayout

export const getServerSideProps = withSSRAuth(async (ctx) => { 
  const params = ctx.params
  return { 
    props: { 
      patientId: params?.patient,
      occurrenceId: params?.occurrence 
    } 
  }
})