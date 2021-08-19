import { Link as ChakraLink } from "@chakra-ui/react"
import { ReactElement } from "react"

import { DashboardLayout } from "../components/Layouts/DashboardLayout"
import Link from 'next/link'

const Dashboard = () => {
  return (
    <>
      <Link href="/about">
        <ChakraLink>Dashboard</ChakraLink>
      </Link>
    </>
  )
}

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return (
    <DashboardLayout>
      {page}
    </DashboardLayout>
  )
}

export default Dashboard
