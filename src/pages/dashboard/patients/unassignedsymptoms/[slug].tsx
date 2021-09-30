import Head from "next/head"

import { 
  Box, 
  Button,
  Divider,
  Flex, 
  Heading,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Table, 
  Tbody, 
  Td, 
  Text, 
  Th, 
  Thead, 
  Tr,  
  Spinner,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";

import { withSSRAuth } from "../../../../utils/withSSRAuth";
import { PatientDataWrapper } from "../../../../components/Layouts/PatientDataWrapper";
import DashboardLayout from "../../../../components/Layouts/DashboardLayout";
import { usePatientSymptomOccurrences } from "../../../../hooks/usePatientSymptomOccurrences";

interface UnassignedSymptomsProps {
  patientId: string;
}

export default function UnassignedSymptoms({ patientId }: UnassignedSymptomsProps) {
  const { data, isLoading, isFetching, error } = usePatientSymptomOccurrences({ patientId })
  
  return (
    <PatientDataWrapper id={patientId} isFetching={isFetching} isLoading={isLoading}>
      <Head>
        <title>MoniPaEp | Sintomas em aberto</title>
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
            <Flex w="100%" h="100%" px="8" justifyContent="space-between">
              { data?.length === 0 ? (
                <Text mt="2">
                  Não existem ocorrências de sintomas em aberto deste paciente.
                </Text>
              ) : (
                <>
                  <Table maxW="45%" border="1px" borderColor="gray.200" boxShadow="md" mb="4" mt="8" variant="striped">
                    <Thead bgColor="gray.200">
                      <Tr>
                        <Th>Sintoma</Th>
                        <Th>Data da ocorrência</Th>
                      </Tr>
                    </Thead>

                    <Tbody>
                      { data?.map(symptomOccurrence => (
                        <Tr key={symptomOccurrence.id} _hover={{ bgColor: 'gray.50' }}>
                          <Td>
                            {symptomOccurrence.symptom_name}
                          </Td>
                          <Td>
                            {symptomOccurrence.registered_date}
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                  <Box mt="4">
                    <Divider orientation="vertical" mx="6" size="100%"/>
                  </Box>
                  <Flex maxW="45%" w="100%" mt="8" direction="column">
                    <Text w="100%" mb="4" fontWeight="semibold" textAlign="center">
                      Associar sintomas à uma ou mais ocorrências de doença
                    </Text>
                    <VStack w="100%">
                      <Input />
                    </VStack>
                  </Flex>
                </>
              )}
            </Flex>
          </>
        )}
      </Flex>
    </PatientDataWrapper>
  )
}

UnassignedSymptoms.layout = DashboardLayout

export const getServerSideProps = withSSRAuth(async (ctx) => { 
  const params = ctx.params
  return { 
    props: { 
      patientId: params?.slug 
    } 
  }
})