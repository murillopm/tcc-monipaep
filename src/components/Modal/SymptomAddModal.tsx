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

interface SymptomAddModalProps {
  isOpen: boolean;
  onClose: () => void;
  refetchList: () => void;
}

export function SymptomAddModal({ isOpen, onClose, refetchList }: SymptomAddModalProps) {
  const [newSymptom, setNewSymptom] = useState('')
  const [touched, setTouched] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const toast = useToast()

  function handleSymptomInputChanged(event: ChangeEvent<HTMLInputElement>) {
    setNewSymptom(event.target.value)
    if(!touched) {
      setTouched(true)
    }
  }

  function handleClose() {
    setNewSymptom('')
    setTouched(false)
    onClose()
  }

  async function handleUpdate() {
    if(newSymptom !== '') {
      setIsUpdating(true)
      try {
        const response = await api.post('/symptom/', { symptom: newSymptom })
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
          <ModalHeader textAlign="center">Adicionar sintoma</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontWeight="semibold" mb="2">Nome do sintoma</Text>
            <Input value={newSymptom} mb="2" onChange={handleSymptomInputChanged}/>
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleClose} mr="3">Cancelar</Button>
            <Button 
              onClick={handleUpdate} 
              colorScheme="blue" 
              disabled={!touched} 
              isLoading={isUpdating}
            >
              Adicionar
            </Button>
          </ModalFooter>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  )
}