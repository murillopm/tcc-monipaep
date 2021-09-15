import { useState, ChangeEvent, useCallback } from "react";
import Head from "next/head"
import { debounce } from "ts-debounce"
import DashboardLayout from "../../../components/Layouts/DashboardLayout";
import { 
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel, 
  Box, 
  Button,
  Flex, 
  Heading, 
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Text, 
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import { BiPencil, BiTrash } from 'react-icons/bi'
import { MdSearch } from 'react-icons/md'
import { RiAddLine } from 'react-icons/ri'

import { withSSRAuth } from "../../../utils/withSSRAuth";
import { useFaqs } from "../../../hooks/useFaqs";
import { FaqEditModal } from "../../../components/Modal/FaqEditModal";
import { FaqExcludeAlert } from "../../../components/AlertDialog/FaqExcludeAlert";
import { FaqAddModal } from "../../../components/Modal/FaqAddModal";

type Faq = {
  id: string;
  question: string;
  answer: string;
}

export default function Faqs() {
  const [search, setSearch] = useState('')
  const [questionModal, setQuestionModal] = useState<Faq | undefined>(undefined)
  const [questionDeletionId, setQuestionDeletionId] = useState<string | undefined>(undefined)
  const { data , isLoading, isFetching, error, refetch } = useFaqs({ filter: search })
  const { 
    isOpen: isOpenEditModal, 
    onOpen: onOpenEditModal, 
    onClose: onCloseEditModal 
  } = useDisclosure()

  const { 
    isOpen: isOpenExcludeAlert, 
    onOpen: onOpenExcludeAlert, 
    onClose: onCloseExcludeAlert 
  } = useDisclosure()

  const { 
    isOpen: isOpenAddModal, 
    onOpen: onOpenAddModal, 
    onClose: onCloseAddModal 
  } = useDisclosure()

  const debouncedChangeInputHandler = useCallback(
    debounce(handleChangeInput, 600)
  , []) 

  function handleChangeInput(event: ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value)
  }

  function handleEditQuestion(faq: Faq) {
    setQuestionModal(faq)
    onOpenEditModal()
  }

  function handleDeleteQuestion(id: string) {
    setQuestionDeletionId(id)
    onOpenExcludeAlert()
  }
  
  return (
    <>
      <Head>
        <title>MoniPaEp | FAQs</title>
      </Head>
      

      <Flex h="100%" w="100%" bgColor="white" borderRadius="4" direction="column" >
        <Heading ml="8" my="6">
          FAQs
          {!isLoading && isFetching && <Spinner ml="4"/>}
        </Heading>
        { isLoading ? (
          <Box w="100%" h="100%" display="flex" justifyContent="center" alignItems="center">
            <Spinner size="lg"/>
          </Box>
        ) : error ? (
          <Box w="100%" display="flex" justifyContent="center" alignItems="center">
            <Text>Erro ao carregar os dados</Text>
          </Box>
        ) : (
          <>
            <FaqAddModal
              isOpen={isOpenAddModal} 
              onClose={onCloseAddModal} 
              refetchList={refetch}
            />

            { questionModal && (
              <FaqEditModal 
                isOpen={isOpenEditModal} 
                onClose={onCloseEditModal} 
                faq={questionModal} 
                refetchList={refetch}
              />
            )}

            {questionDeletionId && (
              <FaqExcludeAlert 
                isOpen={isOpenExcludeAlert} 
                onClose={onCloseExcludeAlert} 
                faqId={questionDeletionId}
                refetchList={refetch}
              />
            )}
            <Flex mx="8" mb="8" justifyContent="space-between" alignItems="center">
              <InputGroup w="30">
                <InputLeftElement children={<Icon as={MdSearch} fontSize="xl" color="gray.400"/>}/>
                <Input placeholder="Filtrar..." onChange={debouncedChangeInputHandler}/>
              </InputGroup>  
              <Button  
                size="sm" 
                fontSize="sm" 
                colorScheme="blue"
                leftIcon={<Icon as={RiAddLine} fontSize="20"/>}
                onClick={onOpenAddModal}
              >
                Criar novo
              </Button>
                     
            </Flex>

            <Flex direction="column" w="100%" overflow="auto" px="8">
              { data?.totalFaqs === 0 ? (
                <Text mt="2">Não existem questões registradas até o momento.</Text>
              ) : (
                <>
                  <Accordion 
                    allowMultiple 
                    bgColor="gray.100" 
                    boxShadow="md" 
                    border="1px" 
                    borderColor="gray.200"
                  >
                    {data?.faqs.map(faq => (
                      <AccordionItem key={faq.id} _hover={{bgColor: 'custom.blue-100'}}>
                        <h2>
                          <AccordionButton>
                            <Text flex="1" textAlign="left" fontWeight="semibold">
                              {faq.question}
                            </Text>
                          <AccordionIcon />
                          </AccordionButton>
                        </h2>
                        <AccordionPanel bgColor="gray.50" pb={3} pr="3">
                          <Flex w="100%" justifyContent="space-between">
                            <Text>{faq.answer}</Text>
                            <Flex direction="column" w="9">
                              <Button 
                                fontSize="lg" 
                                height="36px" 
                                width="36px" 
                                colorScheme="red" 
                                mb="1"
                                onClick={() => handleDeleteQuestion(faq.id)}
                              >
                                <Icon as={BiTrash}/>
                              </Button>
                              <Button 
                                fontSize="lg" 
                                height="36px" 
                                width="36px" 
                                colorScheme="blue" 
                                onClick={() => handleEditQuestion(faq)}
                              >
                                <Icon as={BiPencil}/>
                              </Button>
                            </Flex>
                          </Flex>
                        </AccordionPanel>
                      </AccordionItem>
                    ))}
                  </Accordion>
                  <Text 
                    borderRadius="4" 
                    px="1"
                    mt="4"
                  >
                    <strong>1</strong> - <strong> {data?.totalFaqs}</strong> de <strong>{data?.totalFaqs}</strong>
                  </Text>
                </>
              )}
            </Flex>
          </>
        )}
      </Flex>
    </>
  )
}

Faqs.layout = DashboardLayout

export const getServerSideProps = withSSRAuth(async (ctx) => { 
  return { props: {} }
})