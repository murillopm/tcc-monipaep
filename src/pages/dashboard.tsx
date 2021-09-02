import { useContext, useEffect } from "react"
import Link from 'next/link'
import { Link as ChakraLink } from "@chakra-ui/react"

import DashboardLayout from "../components/Layouts/DashboardLayout"
import { AuthContext } from "../contexts/AuthContext"
import { api } from "../services/apiClient"
import { withSSRAuth } from "../utils/withSSRAuth"
import { setupAPIClient } from "../services/api"
import { Can } from "../components/Can"

export default function Dashboard() {
  const { user } = useContext(AuthContext)

  useEffect(() => {
    api.get('/systemuser/me')
      .then(response => console.log('useeffect'))
      .catch(err => console.log(err))
  }, [])
  
  return (
    <>
      <h1>Dashboard: {user?.user.email}</h1>
      <Can permissions={['usm.user']}>
        <h1>Pode</h1>
      </Can>
      <Link href="/">
        <ChakraLink>Dashboard</ChakraLink>
      </Link>
    </>
  )
}

Dashboard.layout = DashboardLayout

export const getServerSideProps = withSSRAuth(async (ctx) => {
  // const apiClient = setupAPIClient(ctx)
  // const response = await apiClient.get('/systemuser/me')

  // console.log(response.data)
  
  return {
    props: {}
  }
})
