import { Box, Flex, Text } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import { useQuery } from "react-query";
import DashboardLayout from "../../components/Layouts/DashboardLayout";
import { api } from "../../services/apiClient";

type Patient = {
  id: string;
  activeAccount: boolean;
  name: string;
  CPF: string;
  email: string;
  status: string;
  createdAt: string;
}

type GetPatientsResponse = [
  Patient[],
  Number,
]

export default function Patients() {
  const { data , isLoading, error } = useQuery('patients', async () => {
    const response = await api.get<GetPatientsResponse>('/patients')
    return response.data
  })
  
  return (
    <Flex>
      { isLoading ? (
        <Spinner />
      ) : error ? (
        <Text>Error</Text>
      ) : (
        <Box>
          { data && data[0].map(pacient => (
            <Text key={pacient.id}>{pacient.name}</Text>
          )) }
        </Box>
      )}
    </Flex>
  )
}

Patients.layout = DashboardLayout