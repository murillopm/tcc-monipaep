import { useContext, useEffect } from "react"
import Link from 'next/link'
import { Link as ChakraLink } from "@chakra-ui/react"

import DashboardLayout from "../components/Layouts/DashboardLayout"
import { AuthContext } from "../contexts/AuthContext"
import { api } from "../services/apiClient"
import { withSSRAuth } from "../utils/withSSRAuth"
import { setupAPIClient } from "../services/api"

export default function Dashboard() {
  const { user } = useContext(AuthContext)

  useEffect(() => {
    api.get('/systemuser/me')
      .then(response => console.log(response))
      .catch(err => console.log(err))
  }, [])
  
  return (
    <>
      <h1>Dashboard: {user?.email}</h1>
      <Link href="/">
        <ChakraLink>Dashboard</ChakraLink>
      </Link>
    </>
  )
}

Dashboard.layout = DashboardLayout

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx)
  const response = await apiClient.get('/systemuser/me')

  console.log(response.data)
  
  return {
    props: {}
  }
})
