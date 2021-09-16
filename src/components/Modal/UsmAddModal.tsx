import {
  Button,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalFooter,
  ModalBody,
  ModalHeader,
  Text,
  Input,
  useToast,
} from '@chakra-ui/react';
import { useState, ChangeEvent } from 'react';
import { api } from '../../services/apiClient';

interface UsmModalProps {
  isOpen: boolean;
  onClose: () => void;
  refetchList: () => void;
}

export function UsmAddModal({ isOpen, onClose, refetchList }: UsmModalProps) {
  const [usmName, setUsmName] = useState('')
  const [usmAddress, setUsmAddress] = useState('')
  const [usmNeighborhood, setUsmNeighborhood] = useState('')
  const [touched, setTouched] = useState(false)
  const [isPosting, setIsPosting] = useState(false)
  const toast = useToast()

  function handleNameInputChanged(event: ChangeEvent<HTMLInputElement>) {
    setUsmName(event.target.value)
    if(!touched) {
      setTouched(true)
    }
  }

  function handleAddressInputChanged(event: ChangeEvent<HTMLInputElement>) {
    setUsmAddress(event.target.value)
    if(!touched) {
      setTouched(true)
    }
  }

  function handleNeighborhoodInputChanged(event: ChangeEvent<HTMLInputElement>) {
    setUsmNeighborhood(event.target.value)
    if(!touched) {
      setTouched(true)
    }
  }

  function handleClose() {
    setUsmName('')
    setUsmAddress('')
    setUsmNeighborhood('')
    setTouched(false)
    onClose()
  }

  async function handleUsmCreation() {
    console.log('')
    // if(diseaseName !== '' && infectedDays > 0 && suspectDays > 0) {
    //   setIsPosting(true)
    //   try {
    //     const response = await api.post('/disease/', {
    //       name: diseaseName,
    //       infected_Monitoring_Days: infectedDays,
    //       suspect_Monitoring_Days: suspectDays,
    //     })
    //     toast({
    //       title: "Sucesso",
    //       description: response.data?.success,
    //       status: "success",
    //       isClosable: true
    //     })
    //   handleClose()
    //   refetchList()
    // } catch (error: any) {
    //   toast({
    //     title: "Erro na alteração",
    //     description: error.response?.data.error,
    //     status: "error",
    //     isClosable: true
    //   })
    // }
    // setIsPosting(false)
    
    // } else {
    //   toast({
    //     title: "Erro na criação",
    //     description: 'Preencha os campos corretamente',
    //     status: "error",
    //     isClosable: true
    //   })
    // }
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
        <ModalContent height="auto" width="600px">
          <ModalHeader textAlign="center">Adicionar unidade de saúde</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontWeight="semibold" mb="3">Nome da unidade</Text>
            <Input value={usmName} mb="4" onChange={handleNameInputChanged}/>
            <Text fontWeight="semibold" mb="3">Endereço</Text>
            <Input value={usmAddress} mb="4" onChange={handleAddressInputChanged}/>
            <Text fontWeight="semibold" mb="3">Bairro</Text>
            <Input value={usmNeighborhood} mb="4" onChange={handleNeighborhoodInputChanged}/>
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleClose} mr="3">Cancelar</Button>
            <Button 
              onClick={handleUsmCreation} 
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