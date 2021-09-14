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
} from '@chakra-ui/react';
import { ChangeEvent, useEffect, useState } from 'react';
import { api } from '../../services/apiClient';

type Faq = {
  id: string;
  question: string;
  answer: string;
}

interface FaqModalProps {
  isOpen: boolean;
  faq: Faq | undefined;
  onClose: () => void;
  refetchList: () => void;
}

export function FaqModal({ isOpen, onClose, faq, refetchList }: FaqModalProps) {
  const [question, setQuestion] = useState(faq?.question)
  const [answer, setAnswer] = useState(faq?.answer)
  const [touched, setTouched] = useState(false)

  useEffect(() => {
    setQuestion(faq?.question)
    setAnswer(faq?.answer)
  }, [faq])

  function handleQuestionInputChanged(event: ChangeEvent<HTMLInputElement>) {
    setQuestion(event.target.value)
    if(!touched) {
      setTouched(true)
    }
  }

  function handleAnswerInputChanged(event: ChangeEvent<HTMLTextAreaElement>) {
    setAnswer(event.target.value)
    if(!touched) {
      setTouched(true)
    }
  }

  function handleClose() {
    setQuestion(faq?.question)
    setAnswer(faq?.answer)
    setTouched(false)
    onClose()
  }

  async function handleUpdate() {
    try {
      await api.put(`/faq/${faq?.id}`, { question, answer })
    } catch (error) {
      console.log(error)
    }
    onClose()
    refetchList()
  }
  
  return (
    <Modal motionPreset="slideInBottom" size="xl" isOpen={isOpen} onClose={handleClose} isCentered >
      <ModalOverlay>
        <ModalContent height="auto" width="550px">
          <ModalHeader textAlign="center">Editar FAQ</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontWeight="semibold" mb="2">Pergunta</Text>
            <Input value={question} mb="2" onChange={handleQuestionInputChanged}/>
            <Text fontWeight="semibold" mb="2">Resposta</Text>
            <Textarea value={answer} onChange={handleAnswerInputChanged} height="300px" textAlign="justify"/>
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleUpdate} colorScheme="blue" disabled={!touched}>Atualizar</Button>
            <Button onClick={handleClose} ml="3">Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  )
}