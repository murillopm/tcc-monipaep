import { Flex, Table, Text, Thead, Th, Tr, Tbody, Td, Badge, Box } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/spinner";
import { format, parseISO } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { useState } from "react";
import { useQuery } from "react-query";
import DashboardLayout from "../../components/Layouts/DashboardLayout";
import { Pagination } from "../../components/Pagination";
import { api } from "../../services/apiClient";
import { withSSRAuth } from "../../utils/withSSRAuth";

type Patient = {
  id: string;
  name: string;
  CPF: string;
  email: string;
  phone: string;
  neighborhood: string;
  status: string;
  activeAccount: boolean;
  createdAt: string;
}

type GetPatientsResponse = {
  patients: Patient[],
  totalPatients: number,
}

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
  const { data , isLoading, error } = useQuery('patients', async () => {
    const { data } = await api.get<GetPatientsResponse>('/patients')
    const formattedData = data.patients.map(pacient => {
      const dateFormatted = format(parseISO(pacient.createdAt), 'P', { locale: ptBR })
      const formattedCPF = 
        pacient.CPF.slice(0, 3) + "." + pacient.CPF.slice(3, 6) + "."
        + pacient.CPF.slice(6, 9) + "-" + pacient.CPF.slice(9, 12)
      return {
        ...pacient,
        CPF: formattedCPF,
        createdAt: dateFormatted
      }
    })
    const patients: GetPatientsResponse = {
      patients: formattedData,
      totalPatients: data.totalPatients
    }

    return patients
  })
  
  return (
    <Flex h="100%" w="auto" mx="7" mt="10" bgColor="white" borderRadius="4">
      { isLoading ? (
        <Spinner />
      ) : error ? (
        <Text>Error</Text>
      ) : (
        <Flex direction="column" w="100%" overflow="auto">
          <Table size="lg" w="100%" overflow="scroll">
            <Thead>
              <Tr>
                <Th>Nome</Th>
                <Th>CPF</Th>
                <Th>Email</Th>
                <Th>Bairro</Th>
                <Th>Status</Th>
                <Th>Criado em</Th>
              </Tr>
            </Thead>

            <Tbody>
              { data?.patients.map(pacient => (
                <Tr key={pacient.id}>
                  <Td>
                    <Text>{pacient.name}</Text>
                  </Td>
                  <Td>
                    <Text>{pacient.CPF}</Text>
                  </Td>
                  <Td>
                    <Text>{pacient.email}</Text>
                  </Td>
                  <Td>
                    <Text>{pacient.neighborhood}</Text>
                  </Td>
                  <Td>
                    <Badge colorScheme={getBadgeColor(pacient.status)}>
                      {pacient.status}
                    </Badge>
                  </Td>
                  <Td>
                    <Text>{pacient.createdAt}</Text>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
          <Box w="100%" mt="4">
            <Pagination 
              currentPage={page} 
              totalRegisters={200} 
              registersPerPage={10}
              onPageChange={setPage}
            />
          </Box>
          

        </Flex>
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