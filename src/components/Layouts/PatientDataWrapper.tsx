import { ReactNode } from "react";
import { Divider, Flex, Heading } from "@chakra-ui/react";
import { TabNavLink } from "./NavLink/TabNavLink";

interface PatientDataWrapperProps {
  children: ReactNode;
  id: string;
}

export function PatientDataWrapper({ children, id }: PatientDataWrapperProps) {
  return (
    <Flex direction="column" width="100%" bgColor="white">
      <Heading ml="8" my="6">
        Detalhes do paciente
      </Heading>
      <Flex ml="8">
        <TabNavLink href={`/dashboard/patients/details/${id}`} dynamicRoute>
          Dados cadastrais
        </TabNavLink>
        <TabNavLink href={`/dashboard/patients/diseasehistory/${id}`} ml="6" dynamicRoute>
          Histórico de doenças
        </TabNavLink>
        <TabNavLink href="#" ml="6" dynamicRoute>
          Sintomas em aberto
        </TabNavLink>
      </Flex>
      <Divider />
      {children}
    </Flex>
  )
}
