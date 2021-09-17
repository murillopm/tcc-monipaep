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
import dynamic from 'next/dynamic'
import { api } from '../../services/apiClient';
import { googleApi } from '../../services/googleApi';

const Map = dynamic(() => import('../Map/AddUsmMap'), {
  ssr: false
})

const geocodeApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_GEOCODE_API_KEY

interface UsmModalProps {
  isOpen: boolean;
  onClose: () => void;
  refetchList: () => void;
}

type Location = {
  lat: number;
  lng: number;
}

export function UsmAddModal({ isOpen, onClose, refetchList }: UsmModalProps) {
  const [usmName, setUsmName] = useState('')
  const [usmAddress, setUsmAddress] = useState('')
  const [usmNeighborhood, setUsmNeighborhood] = useState('')
  const [lat, setLat] = useState(0)
  const [lng, setLng] = useState(0)
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
    setLat(0)
    setLng(0)
    setTouched(false)
    onClose()
  }

  async function handleCoordinatesFetch() {
    if(usmAddress !== '') {
      const { data } = await googleApi.get('/maps/api/geocode/json', {
        params: {
          components: `route:${usmAddress}|administrative_area:Sao+Carlos|country:Brazil`,
          key: geocodeApiKey,
          language: 'pt-BR'
        }
      })
      console.log(data)
      
      setLat(data.results[0].geometry.location.lat)
      setLng(data.results[0].geometry.location.lng)
    }
  }

  function updatePosition(location: Location) {
    setLat(location.lat)
    setLng(location.lng)
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
          <ModalBody w="100%" height="100%">
            <Text fontWeight="semibold" mb="3">Nome da unidade</Text>
            <Input value={usmName} mb="4" onChange={handleNameInputChanged}/>
            <Text fontWeight="semibold" mb="3">Endereço</Text>
            <Input value={usmAddress} mb="4" onChange={handleAddressInputChanged}/>
            <Text fontWeight="semibold" mb="3">Bairro</Text>
            <Input value={usmNeighborhood} mb="4" onChange={handleNeighborhoodInputChanged}/>
            <Button onClick={handleCoordinatesFetch} mb="2" w="100%">
              Buscar coordenadas
            </Button>
            { lat !== 0 && lng !== 0 && (
              <>
                <Text mb="1">Latitude: {lat}</Text>
                <Text mb="1">Longitude: {lng}</Text>
                <Map center={{ lat, lng }} updatePosition={updatePosition}/>
              </>
            )}
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