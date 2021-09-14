import { ReactNode, useRef } from "react";

import { 
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel, 
  Box, 
  Button,
  ButtonGroup,
  Flex, 
  Heading, 
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Text, 
  Spinner,
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";

interface ExcludeAlertProps {
  isOpen: boolean;
  faqId: string | undefined;
  onClose: () => void;
  children: ReactNode;
}

export function ExcludeAlert({ isOpen, onClose, faqId, children }: ExcludeAlertProps) {
  const cancelRef = useRef(null)

  async function handleFaqExclusion() {
    console.log('excluir', faqId)
  }
  
  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Delete Customer
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure? You can't undo this action afterwards.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose} variant="outline">
              Cancel
            </Button>
            <Button colorScheme="red" onClick={handleFaqExclusion} ml={3}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>

    
    // <Popover
    //   isOpen={isOpen}
    //   onClose={onClose}
    //   placement="right"
    // >
      
    //   <PopoverContent>
    //     <PopoverHeader fontWeight="semibold">Confirmation</PopoverHeader>
    //     <PopoverArrow />
    //     <PopoverCloseButton />
    //     <PopoverBody>
    //       {children}
    //     </PopoverBody>
    //     <PopoverFooter d="flex" justifyContent="flex-end">
    //       <ButtonGroup size="sm">
    //         <Button variant="outline">Cancelar</Button>
    //         <Button colorScheme="red" onClick={handleFaqExclusion}>Excluir</Button>
    //       </ButtonGroup>
    //     </PopoverFooter>
    //   </PopoverContent>
    // </Popover>
  )
}