import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup";
import {
  Button,
  Flex,
  FormControl, 
  FormErrorMessage, 
  FormLabel,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalHeader,
  Select,
  Stack,
  Input,
  useToast,
} from '@chakra-ui/react';

import { api } from '../../services/apiClient';

type UpdatePasswordData = {
  current_password: string;
  new_password: string;
  password_confirmation: string;
}

interface UserPasswordEditModalProps {
  isOpen: boolean;
  userId: string;
  onClose: () => void;
}

const schema = yup.object().shape({
  current_password: yup.string().required('Atual senha obrigatória'),
  new_password: yup.string().required('Nova senha obrigatória').matches(
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
    "A nova senha deve ter no mínimo 8 caracteres, uma letra maiúscula, uma minúscula, um número e um caracter especial"
  ),
  password_confirmation: yup.string().oneOf([
    null, yup.ref('new_password')
  ], 'As senhas precisam ser iguais').required('Confirmação de senha obrigatória')
})

export function UserPasswordEditModal({ isOpen, userId, onClose }: UserPasswordEditModalProps) {
  const [isUpdating, setIsUpdating] = useState(false)
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(schema),
  })
  const { errors } = formState

  const toast = useToast()

  const handlePasswordUpdate: SubmitHandler<UpdatePasswordData> = async (values) => {
    console.log(values)

      setIsUpdating(true)
      try {
        const response = await api.put(`/systemuser/password/${userId}`, {
          current_password: values.current_password,
          new_password: values.new_password,
        })
        toast({
          title: "Sucesso",
          description: response.data?.success,
          status: "success",
          isClosable: true
        })
        onClose()
      } catch (error: any) {
        toast({
          title: "Erro na alteração",
          description: error.response?.data.error,
          status: "error",
          isClosable: true
        })
      }
      setIsUpdating(false)
  }
  
  return (
    <Modal 
      motionPreset="slideInBottom" 
      size="xl" 
      isOpen={isOpen} 
      onClose={onClose} 
      isCentered 
      closeOnOverlayClick={false}
    >
      <ModalOverlay>
        <ModalContent height="auto" width="500px">
          <ModalHeader textAlign="center">Editar senha</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing="4" as="form" onSubmit={handleSubmit(handlePasswordUpdate)}>
              <FormControl isInvalid={!!errors.current_password}>
                <FormLabel>Senha atual</FormLabel>
                <Input 
                  type="password" 
                  {...register("current_password")}
                />
                { !!errors.current_password && (
                <FormErrorMessage>
                  {errors.current_password.message}
                </FormErrorMessage>
              )}
              </FormControl>
              <FormControl isInvalid={!!errors.new_password}>
                <FormLabel>Nova senha</FormLabel>
                <Input 
                  type="password" 
                  {...register("new_password")}
                />
                { !!errors.new_password && (
                <FormErrorMessage>
                  {errors.new_password.message}
                </FormErrorMessage>
              )}
              </FormControl>
              <FormControl isInvalid={!!errors.password_confirmation}>
                <FormLabel>Confirmação da nova senha</FormLabel>
                <Input 
                  type="password" 
                  {...register("password_confirmation")}
                />
                { !!errors.password_confirmation && (
                <FormErrorMessage>
                  {errors.password_confirmation.message}
                </FormErrorMessage>
              )}
              </FormControl>
              <Flex pb="4" pt="3" justifyContent="flex-end">
                <Button onClick={onClose} mr="3">Cancelar</Button>
                <Button 
                  type="submit"
                  colorScheme="blue" 
                  isLoading={isUpdating}
                >
                  Atualizar
                </Button>
              </Flex>
            </Stack>
          </ModalBody>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  )
}