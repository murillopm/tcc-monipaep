import { Button } from "@chakra-ui/button";

interface PaginationItemProps {
  page: number;
  isCurrent?: boolean;
  changePage: (page: number) => void;
}

export function PaginationItem({ page, changePage, isCurrent = false }: PaginationItemProps) {
  return (
    <Button
      size="sm"
      fontSize="xs"
      width="4"
      disabled={isCurrent ?? false}
      _disabled={{
        cursor: 'default'
      }}
      colorScheme={isCurrent ? 'blue' : 'gray'}
      onClick={() => changePage(page)}
    >
      {page}
    </Button>
  )
}