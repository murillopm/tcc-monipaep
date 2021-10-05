import Head from "next/head"

import { Box, Flex, Text, Spinner, VStack } from "@chakra-ui/react";

import { withSSRAuth } from "../../../../utils/withSSRAuth";
import { usePatientDetails } from "../../../../hooks/usePatientDetails";
import { PatientDataWrapper } from "../../../../components/Layouts/PatientDataWrapper"
import DashboardLayout from "../../../../components/Layouts/DashboardLayout";

interface PatientDetailsProps {
  patientId: string;
}

export default function PatientDetails({ patientId }: PatientDetailsProps) {
  const { data, isLoading, isFetching, error } = usePatientDetails({ patientId })
  
  return (
    <PatientDataWrapper id={patientId} isFetching={isFetching} isLoading={isLoading}>
      <Head>
        <title>MoniPaEp | Detalhes do paciente</title>
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
            <VStack ml="8" mt="6" alignItems="flex-start">
              <Flex>
                <Text fontWeight="bold">Nome:&nbsp;</Text>
                <Text>{data?.patients[0].name}</Text>
              </Flex>
              <Flex>
                <Text fontWeight="bold">CPF:&nbsp;</Text>
                <Text>{data?.patients[0].CPF}</Text>
              </Flex>
              <Flex>
                <Text fontWeight="bold">Email:&nbsp;</Text>
                <Text>{data?.patients[0].email}</Text>
              </Flex>
              <Flex>
                <Text fontWeight="bold">Data de nascimento:&nbsp;</Text>
                <Text>{data?.patients[0].birthdate}</Text>
              </Flex>
              <Flex>
                <Text fontWeight="bold">Telefone:&nbsp;</Text>
                <Text>{data?.patients[0].phone}</Text>
              </Flex>
              <Flex>
                <Text fontWeight="bold">Endereço residencial:&nbsp;</Text>
                <Text>{data?.patients[0].homeAddress}, {data?.patients[0].houseNumber}</Text>
              </Flex>
              <Flex>
                <Text fontWeight="bold">Bairro:&nbsp;</Text>
                <Text>{data?.patients[0].neighborhood}</Text>
              </Flex>
              <Flex>
                <Text fontWeight="bold">Endereço do trabalho:&nbsp;</Text>
                <Text>{data?.patients[0].workAddress}</Text>
              </Flex>
              <Flex>
                <Text fontWeight="bold">Plano de saúde:&nbsp;</Text>
                <Text>{data?.patients[0].hasHealthPlan ? 'Possui' : 'Não possui'}</Text>
              </Flex>
              <Flex>
                <Text fontWeight="bold">Status do paciente:&nbsp;</Text>
                <Text>{data?.patients[0].status}</Text>
              </Flex>
              <Flex>
                <Text fontWeight="bold">Status da conta:&nbsp;</Text>
                <Text>{data?.patients[0].activeAccount ? 'Ativa': 'Inativa'}</Text>
              </Flex>
              <Flex>
                <Text fontWeight="bold">Data de registro no aplicativo:&nbsp;</Text>
                <Text>{data?.patients[0].createdAt}</Text>
              </Flex>
            </VStack>
          </>
        )}
      </Flex>
    </PatientDataWrapper>
  )
}

PatientDetails.layout = DashboardLayout

export const getServerSideProps = withSSRAuth(async (ctx) => { 
  const params = ctx.params
  return { 
    props: { 
      patientId: params?.slug 
    } 
  }
})