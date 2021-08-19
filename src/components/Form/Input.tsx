import { FormControl, FormErrorMessage, FormLabel, Input as ChakraInput, InputGroup, InputProps as ChakraInputProps } from '@chakra-ui/react'
import { forwardRef, ForwardRefRenderFunction } from 'react'
import { FieldError } from 'react-hook-form'

interface InputProps extends ChakraInputProps {
  name: string;
  label?: string;
  error?: FieldError | null;
  asMask?: any | null;
  maskType?: string | null;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = ({
  name,
  label,
  error = null,
  asMask = null ,
  maskType = null,
  ...rest
}: InputProps, ref) => {
  return (
    <FormControl isInvalid={!!error}>
      { !!label && (
        <FormLabel htmlFor={name} id={`label-for-${name}`}>{label}</FormLabel>
      ) }
      <InputGroup>
        <ChakraInput 
          as={asMask}
          mask={maskType}
          name={name}
          id={name}
          variant="filled"
          size="lg"
          ref={ref}
          {...rest}
        />
      
      </InputGroup>


      {!!error && (
        <FormErrorMessage>
          {error.message}
        </FormErrorMessage>
      )}
    </FormControl>
  )
}

export const Input = forwardRef(InputBase)