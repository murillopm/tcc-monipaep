import type { NextPage } from 'next'
import { SubmitHandler, useForm } from 'react-hook-form'
import { MdEmail, MdVisibility, MdVisibilityOff } from 'react-icons/md'
import { HiLockClosed } from 'react-icons/hi'
import InputMask from 'react-input-mask'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import Link from 'next/link'

import { Box, Button, Link as ChakraLink, Flex, FormControl, FormErrorMessage, FormLabel, Heading, Icon, Input as ChakraInput, InputGroup, InputLeftElement, InputRightElement, Stack, Text } from '@chakra-ui/react'
import { useState } from 'react'

type LoginData = {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup.string().email('E-mail inválido').required('E-mail obrigatório'),
  password: yup.string().required('Senha obrigatória'),
})

const Home: NextPage = () => {
  const { register, handleSubmit, formState, control } = useForm({
    resolver: yupResolver(schema)
  })
  const [showPassword, setShowPassword] = useState(false)
  const { errors } = formState

  const handleSignIn: SubmitHandler<LoginData> = (values) => {
    
    console.log(values)
  }
  
  return (
    <Flex height="100vh" alignItems="center" justifyContent="center" background="custom.blue-350">
      <Flex direction="column" background="custom.blue-50" p={12} rounded={6} maxWidth={400} mx="auto">
        <Heading mb={6} color="custom.gray-800" textAlign="center">Faça seu login no MoniPaEp</Heading>
        <Flex as="form" direction="column" onSubmit={handleSubmit(handleSignIn)}>
          <Stack spacing={4} mb={4}>     
            <FormControl id="form-email" isInvalid={!!errors.email}>
              <FormLabel htmlFor="email" id="label-for-email" color="custom.gray-800">E-mail</FormLabel>
              <InputGroup>
                <InputLeftElement>
                  <Icon as={MdEmail} color="custom.blue-600"/>
                </InputLeftElement>
                <ChakraInput 
                  type="email" 
                  label="E-mail" 
                  color="custom.gray-800"
                  bgColor="custom.blue-100"
                  variant="filled"
                  borderColor="custom.blue-300"
                  _hover={{
                    'borderColor': 'custom.blue-400'
                  }}
                  focusBorderColor="custom.blue-500"
                  {...register("email")}
                />
              </InputGroup>
              { !!errors?.email && (
                <FormErrorMessage>
                  {errors.email?.message}
                </FormErrorMessage>
              )}
            </FormControl>

            <FormControl id="form-password" isInvalid={!!errors.password}>
              <FormLabel htmlFor="password" id="label-for-password" color="custom.gray-800">Senha</FormLabel>
              <InputGroup >
                <InputLeftElement>
                  <Icon as={HiLockClosed} color="custom.blue-600"/>
                </InputLeftElement>
                <ChakraInput 
                  type={showPassword ? "text": "password"}
                  label="password" 
                  color="custom.gray-800"
                  bgColor="custom.blue-100"
                  variant="filled"
                  borderColor="custom.blue-300"
                  _hover={{
                    'borderColor': 'custom.blue-400'
                  }}
                  focusBorderColor="custom.blue-500"
                  {...register("password")}
                />
                <InputRightElement>
                  <Icon 
                    as={showPassword ? MdVisibility : MdVisibilityOff} 
                    color="custom.blue-600" 
                    _hover={{'cursor': 'pointer'}}
                    onClick={() => setShowPassword(prevState => !prevState)}
                  />
                </InputRightElement>
              </InputGroup>
              { !!errors?.password && (
                <FormErrorMessage>
                  {errors.password?.message}
                </FormErrorMessage>
              )}
            </FormControl>
          </Stack>
      
          <Button 
            type="submit" 
            bgColor="custom.blue-600" 
            color="white"
            _hover={{'bgColor': 'custom.blue-500'}}
          >
            ENTRAR
          </Button>

          <Box display="flex" width="100%" justifyContent="center" mt={3}>
            <Text>Não tem uma conta?&nbsp;</Text>
            <Link href="#">
              <ChakraLink>Cadastre-se</ChakraLink>
            </Link>
          </Box>
          <Link href="#">
            <ChakraLink textAlign="center">Esqueceu a senha?</ChakraLink>
          </Link>
        </Flex>
        
      </Flex>
    </Flex>
  )
}

export default Home
