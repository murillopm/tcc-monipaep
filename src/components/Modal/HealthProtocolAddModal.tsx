import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalFooter,
  ModalBody,
  ModalHeader,
  Text,
  Textarea,
  Input,
  useToast,
} from '@chakra-ui/react';
import { useState, ChangeEvent } from 'react';
import { api } from '../../services/apiClient';

interface HealthProtocolAddModalProps {
  isOpen: boolean;
  onClose: () => void;
  refetchList: () => void;
}

export function HealthProtocolAddModal({ isOpen, onClose, refetchList }: HealthProtocolAddModalProps) {
  const [healthProtocol, setHealthProtocol] = useState('')
  const [touched, setTouched] = useState(false)
  const [isPosting, setIsPosting] = useState(false)
  const toast = useToast()

  function handleHealthProtocolInputChanged(event: ChangeEvent<HTMLTextAreaElement>) {
    setHealthProtocol(event.target.value)
    if(!touched) {
      setTouched(true)
    }
  }

  function handleClose() {
    setHealthProtocol('')
    setTouched(false)
    onClose()
  }

  async function handleHealthProtocolCreation() {
    if(healthProtocol !== '') {
      setIsPosting(true)
      try {
        const response = await api.post('/healthprotocol/', { description: healthProtocol })
        toast({
          title: "Sucesso",
          description: response.data?.success,
          status: "success",
          isClosable: true
        })
      handleClose()
      refetchList()
    } catch (error: any) {
      toast({
        title: "Erro na criação",
        description: error.response?.data.error,
        status: "error",
        isClosable: true
      })
    }
    setIsPosting(false)
    
    } else {
      toast({
        title: "Erro",
        description: 'Preencha o campo com o nome do sintoma',
        status: "error",
        isClosable: true
      })
    }
  }
  
  return (
    <Modal 
      motionPreset="slideInBottom" 
      size="xl" 
      isOpen={isOpen} 
      onClose={handleClose} 
      isCentered 
      closeOnOverlayClick={false}
    >
      <ModalOverlay>
        <ModalContent height="auto" width="500px">
          <ModalHeader textAlign="center">Adicionar protocolo de saúde</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontWeight="semibold" mb="2">Descrição</Text>
            <Textarea value={healthProtocol} mb="2" onChange={handleHealthProtocolInputChanged}/>
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleClose} mr="3">Cancelar</Button>
            <Button 
              onClick={handleHealthProtocolCreation} 
              colorScheme="blue" 
              disabled={!touched} 
              isLoading={isPosting}
            >
              Registrar
            </Button>
          </ModalFooter>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  )
}