import { useRef, useState } from "react";
import { 
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  useToast,
} from "@chakra-ui/react";
import { api } from "../../services/apiClient";

interface ExcludeAlertProps {
  isOpen: boolean;
  faqId: string | undefined;
  onClose: () => void;
  refetchList: () => void;
}

export function FaqExcludeAlert({ isOpen, onClose, faqId, refetchList }: ExcludeAlertProps) {
  const [isDeletting, setIsDeletting] = useState(false)
  const cancelRef = useRef(null)
  const toast = useToast()

  async function handleFaqExclusion() {
    setIsDeletting(true)
    try {
      const response = await api.delete(`/faq/${faqId}`)
      toast({
        title: "Sucesso",
        description: response.data?.success,
        status: "success",
        isClosable: true
      })
      refetchList()
      onClose()
      setIsDeletting(false)
    } catch (error: any) {
      toast({
        title: "Erro na remoção",
        description: error.response?.data.error,
        status: "error",
        isClosable: true
      })
    }
    setIsDeletting(false)
  }
  
  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      motionPreset="slideInBottom"
      isCentered
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Deletar FAQ
          </AlertDialogHeader>
          <AlertDialogBody>
            Tem certeza que deseja excluir essa questão?
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose} variant="outline">
              Cancelar
            </Button>
            <Button colorScheme="red" onClick={handleFaqExclusion} ml={3} isLoading={isDeletting}>
              Deletar
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