import { useQuery } from "react-query";

import { api } from "../services/apiClient";

type AssignedHealthProtocolResponse = {
  disease_name: string;
  healthprotocol: {
    id: string;
    description: string;
  };
}

type GetAssignedHealthProtocolsResponse = {
  assignedHealthProtocols: AssignedHealthProtocolResponse[],
  totalAssignedHealthProtocols: number,
}

interface UseAssignedHealthProtocolProps {
  page: number;
  filter?: string;
}

export async function getAssignedHealthProtocols(page: number, filter?: string) {
  let params: any = { page }
  // if(filter) {
  //   params = { ...params, description: filter }
  // }
  const { data } = await api.get<GetAssignedHealthProtocolsResponse>('/assignedhealthprotocol', { params })
  const formattedData = data.assignedHealthProtocols.map(assignedHealthProtocol => {
    return {
      diseaseName: assignedHealthProtocol.disease_name,
      healthProtocol: assignedHealthProtocol.healthprotocol
    }
  })
  return {
    assignedHealthProtocols: formattedData,
    totalAssignedHealthProtocols: data.totalAssignedHealthProtocols,
  }
}

export function useAssignedHealthProtocols({ page, filter = '' }: UseAssignedHealthProtocolProps) { 
  return useQuery(['assignedHealthProtocols', page, filter], () => {
    if(filter !== '') {
      return getAssignedHealthProtocols(page, filter)
    }
    return getAssignedHealthProtocols(page)
  }, {
    keepPreviousData: true,
    staleTime: 1000 * 5
  })
}