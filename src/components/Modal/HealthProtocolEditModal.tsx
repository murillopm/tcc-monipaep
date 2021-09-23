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
import { ChangeEvent, useEffect, useState } from 'react';
import { api } from '../../services/apiClient';

type HealthProtocol = {
  id: string;
  description: string;
}

interface HealthProtocolEditModalProps {
  isOpen: boolean;
  healthProtocol: HealthProtocol;
  onClose: () => void;
  refetchList: () => void;
}

export function HealthProtocolEditModal({ isOpen, onClose, healthProtocol, refetchList }: HealthProtocolEditModalProps) {
  const [healthProtocolDescription, setHealthProtocolDescription] = useState(healthProtocol.description)
  const [touched, setTouched] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const toast = useToast()

  useEffect(() => {
    setHealthProtocolDescription(healthProtocol.description)
  }, [healthProtocol])

  function handleDescriptionInputChanged(event: ChangeEvent<HTMLTextAreaElement>) {
    setHealthProtocolDescription(event.target.value)
    if(!touched) {
      setTouched(true)
    }
  }

  function handleClose() {
    setHealthProtocolDescription(healthProtocol.description)
    setTouched(false)
    onClose()
  }

  async function handleHealthProtocolUpdate() {
    if(healthProtocolDescription !== '') {
      setIsUpdating(true)
      try {
        const response = await api.put(`/healthprotocol/${healthProtocol.id}`, {
          description: healthProtocolDescription 
        })
        toast({
          title: "Sucesso",
          description: response.data?.success,
          status: "success",
          isClosable: true
        })
      setTouched(false)
      onClose()
      refetchList()
    } catch (error: any) {
      toast({
        title: "Erro na alteração",
        description: error.response?.data.error,
        status: "error",
        isClosable: true
      })
    }
    setIsUpdating(false)
    
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
          <ModalHeader textAlign="center">Editar sintoma</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontWeight="semibold" mb="2">Nome do sintoma</Text>
            <Textarea value={healthProtocolDescription} mb="2" onChange={handleDescriptionInputChanged}/>
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleClose} mr="3">Cancelar</Button>
            <Button 
              onClick={handleHealthProtocolUpdate} 
              colorScheme="blue" 
              disabled={!touched} 
              isLoading={isUpdating}
            >
              Atualizar
            </Button>
          </ModalFooter>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  )
}