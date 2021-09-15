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

interface SymptomModalProps {
  isOpen: boolean;
  symptom: string | undefined;
  onClose: () => void;
  refetchList: () => void;
}

export function SymptomEditModal({ isOpen, onClose, symptom, refetchList }: SymptomModalProps) {
  const [newSymptom, setNewSymptom] = useState(symptom)
  const [touched, setTouched] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const toast = useToast()

  useEffect(() => {
    setNewSymptom(symptom)
  }, [symptom])

  function handleSymptomInputChanged(event: ChangeEvent<HTMLInputElement>) {
    setNewSymptom(event.target.value)
    if(!touched) {
      setTouched(true)
    }
  }

  function handleClose() {
    setNewSymptom(symptom)
    setTouched(false)
    onClose()
  }

  async function handleUpdate() {
    if(newSymptom !== '') {
      setIsUpdating(true)
      try {
        const response = await api.put(`/symptom/${symptom}`, { symptom: newSymptom })
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
              Atualizar
            </Button>
          </ModalFooter>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  )
}