import { useQuery } from "react-query";
import { format, parseISO } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";

import { api } from "../services/apiClient";

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

type FilterPatient = [
  filter: string,
  value: string
]

export async function getPatients(page: number, filter?: FilterPatient) {
  let params = { page }
  if(filter) {
    params = { ...params, [filter[0]]: filter[1] }
  }
  const { data } = await api.get<GetPatientsResponse>('/patients', { params })
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
}

interface UsePatientsProps {
  page: number;
  filter?: FilterPatient
}

export function usePatients({ page, filter = ['name', ''] }: UsePatientsProps) {
  const key = filter[1] === '' ? page : `${filter[0]}-${filter[1]}-${page}-` 
  return useQuery(['patients', key], () => {
    if(!filter || filter[1] === '') {
      return getPatients(page)
    }
    return getPatients(page, filter)
  }, {
    keepPreviousData: true,
  })
}