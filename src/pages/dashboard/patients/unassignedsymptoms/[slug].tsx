import { ChangeEvent, useEffect, useState } from "react";
import Head from "next/head"
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import ptBR from "date-fns/locale/pt-BR";
import { 
  Box, 
  Button,
  Checkbox,
  Divider,
  Flex, 
  Heading,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Table, 
  Tbody, 
  Td, 
  Text, 
  Textarea,
  Th, 
  Thead, 
  Tr,  
  SimpleGrid,
  Select,
  Spinner,
  useToast,
  VStack,
} from "@chakra-ui/react";

import { withSSRAuth } from "../../../../utils/withSSRAuth";
import { PatientDataWrapper } from "../../../../components/Layouts/PatientDataWrapper";
import DashboardLayout from "../../../../components/Layouts/DashboardLayout";
import { usePatientSymptomOccurrences } from "../../../../hooks/usePatientSymptomOccurrences";
import { api } from "../../../../services/apiClient";

type GetDiseasesResponse = {
  diseases: {
    name: string;
  } []
}

type DiseaseList = {
  diseaseName: string;
  selected: boolean;
}
interface UnassignedSymptomsProps {
  patientId: string;
}

registerLocale('ptBR', ptBR)
export default function UnassignedSymptoms({ patientId }: UnassignedSymptomsProps) {
  const [startDate, setStartDate] = useState<Date | undefined>(undefined)
  const [diseaseList, setDiseaseList] = useState<DiseaseList[] | undefined>(undefined)
  const [diseaseStatus, setDiseaseStatus] = useState('Suspeito')
  const [diagnosis, setDiagnosis] = useState('')
  const [isPosting, setIsPosting] = useState(false)
  const { data, isLoading, isFetching, error,  } = usePatientSymptomOccurrences({ patientId })
  const toast = useToast()

  useEffect(() => {
    if(data && data.length > 0) {
      setStartDate(new Date(data[data.length - 1]?.registered_date))
    }
  }, [isLoading])

  useEffect(() => {
    const getDiseaseOptions = async() => {
      const { data } = await api.get<GetDiseasesResponse>('/disease')
      const diseaseList: DiseaseList[] = data.diseases.map(disease => {
        return {
          diseaseName: disease.name,
          selected: false,
        }
      })
      setDiseaseList(diseaseList)
    }
    getDiseaseOptions()
  }, [])

  function handleChangeDate(date: Date) {
    if(date) {
      setStartDate(date)
    }
  }

  function handleCheckboxClick(diseaseName: string) {
    const newDiseaseList = diseaseList?.map(disease => {
      if(disease.diseaseName === diseaseName) {
        return {
          ...disease,
          selected: !disease.selected
        }
      }
      return disease
    })
    setDiseaseList(newDiseaseList)
  }

  async function handleDiseaseOccurrenceCreation() {
    let markedDiseases: string[] = []
    
    diseaseList?.forEach(disease => {
      if(disease.selected) {
        markedDiseases.push(disease.diseaseName)
      }
    })
    
    if(startDate && diagnosis !== '' && markedDiseases.length > 0) {
      setIsPosting(true)
      try {
        const response = await api.post('/diseaseoccurrence', {
          patient_id: patientId,
          disease_name: markedDiseases,
          status: diseaseStatus,
          date_start: startDate,
          diagnosis,
        })
        toast({
          title: "Sucesso",
          description: response.data?.success,
          status: "success",
          isClosable: true
        })
      } catch (error: any) {
        toast({
          title: "Erro na criação",
          description: error.response?.data.error,
          status: "error",
          isClosable: true
        })
      }
      setIsPosting(false)
    }
  }
  
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
            <Flex w="100%" px="8" justifyContent="space-between">
              { data?.length === 0 ? (
                <Text mt="9">
                  Não existem ocorrências de sintomas em aberto deste paciente.
                </Text>
              ) : (
                <>
                  <Box maxW="47%" w="100%">
                    <Text fontSize="lg" mb="5" mt="8" fontWeight="semibold">
                      Histórico de sintomas do paciente
                    </Text>
                    <Table w="100%" border="1px" borderColor="gray.200" boxShadow="md">
                      <Thead bgColor="gray.200">
                        <Tr>
                          <Th>Sintoma</Th>
                          <Th>Data da ocorrência</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        { data?.map(symptomOccurrence => (
                          <Tr key={symptomOccurrence.id} _hover={{ bgColor: 'gray.50' }}>
                            <Td>{symptomOccurrence.symptom_name}</Td>
                            <Td>{symptomOccurrence.formatted_date}</Td>
                          </Tr>
                        ))}
                      </Tbody>
                    </Table>
                  </Box>
                  <Box mt="4" minH="calc(100vh - 156px)">
                    <Divider orientation="vertical" mx="6" size="100%"/>
                  </Box>
                  <Flex maxW="47%" w="100%"  direction="column">
                    <Text w="100%" mt="8" mb="5" fontWeight="semibold" fontSize="lg">
                      Associar sintomas à uma ou mais ocorrências de doença
                    </Text>
                    <VStack w="100%" alignItems="flex-start">
                      <Flex alignItems="center" w="100%" justifyContent="space-between">
                        <Flex mr="5" w="50%" alignItems="center">
                          <Text mr="3">Data de início:</Text>
                          <Box w="120px">
                            <DatePicker 
                              locale="ptBR"
                              selected={startDate} 
                              onChange={handleChangeDate}
                              minDate={data ? new Date(data[data.length - 1].registered_date) : startDate}
                              showTimeSelect
                              timeFormat="p"
                              timeIntervals={15}
                              dateFormat="dd/MM/yyyy"
                            />
                          </Box>
                        </Flex>
                        <Flex alignItems="center" >
                          <Text mr="3">Status:</Text>
                          <Select value={diseaseStatus} onChange={e => setDiseaseStatus(e.target.value)}>
                            <option value="Suspeito">Suspeito</option>
                            <option value="Infectado">Infectado</option>
                          </Select>
                        </Flex>
                      </Flex>
                      <Flex w="100%">
                        <Text mr="6">Diagnóstico:</Text>
                        <Textarea w="100%" onChange={e => setDiagnosis(e.target.value)}/>
                      </Flex>
                      <Flex w="100%" direction="column">
                        <Text mb="3">Doenças:</Text>
                        <SimpleGrid 
                          w="100%" 
                          alignItems="center" 
                          spacing="4" 
                          minChildWidth="80px" 
                          columnGap="30px"
                          rowGap="10px"
                        >
                          { diseaseList && (
                            diseaseList.map(disease => (
                              <Checkbox 
                                key={disease.diseaseName} 
                                isChecked={disease.selected} 
                                onChange={() => handleCheckboxClick(disease.diseaseName)}
                              >
                                {disease.diseaseName}
                              </Checkbox>
                            ))
                          )}
                        </SimpleGrid>
                      </Flex>
                      <Button 
                        onClick={handleDiseaseOccurrenceCreation}
                        isLoading={isPosting}
                      >
                        Criar
                      </Button>
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