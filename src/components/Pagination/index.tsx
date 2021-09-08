import { Flex, Text, HStack } from "@chakra-ui/react";
import { PaginationItem } from "./PaginationItem";

interface PaginationProps {
  totalRegisters: number | undefined;
  registersPerPage: number | undefined;
  page: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ totalRegisters, registersPerPage, page = 1, onPageChange }: PaginationProps) {
  let initialRange = 1 + (registersPerPage ?? 1) * (page - 1)
  let finalRange = (registersPerPage ?? 1) * page 
  const total = totalRegisters ?? 1
  if(finalRange > total) {
    finalRange = total
  }
  if(initialRange > finalRange) {
    initialRange = finalRange
  }
  
  return (
    <Flex w="100%" justifyContent="space-between" alignItems="center" px="4">
      <Text><strong>{initialRange}</strong> - <strong> {finalRange}</strong> de <strong>{total}</strong></Text>
      <HStack spacing="2">
        <PaginationItem page={page-1} changePage={onPageChange}/>
        <PaginationItem page={page} isCurrent changePage={onPageChange}/>
        <PaginationItem page={page+1} changePage={onPageChange}/>
      </HStack>
    </Flex>
  )
}