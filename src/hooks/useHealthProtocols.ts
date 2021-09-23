import { useQuery } from "react-query";

import { api } from "../services/apiClient";

type HealthProtocol = {
  id: string;
  description: string;
}

type GetHealthProtocolsResponse = {
  healthProtocols: HealthProtocol[],
  totalHealthProtocols: number,
}

interface UseHealthProtocolProps {
  page: number;
  filter?: string;
}

export async function getHealthProtocols(page: number, filter?: string) {
  let params: any = { page }
  if(filter) {
    params = { ...params, description: filter }
  }
  const { data } = await api.get<GetHealthProtocolsResponse>('/healthprotocol', { params })
  return data
}

export function useHealthProtocols({ page, filter = '' }: UseHealthProtocolProps) { 
  return useQuery(['healthProtocols', page, filter], () => {
    if(filter !== '') {
      return getHealthProtocols(page, filter)
    }
    return getHealthProtocols(page)
  }, {
    keepPreviousData: true,
    staleTime: 1000 * 5
  })
}