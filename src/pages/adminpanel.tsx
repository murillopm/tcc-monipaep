import DashboardLayout from "../components/Layouts/DashboardLayout"

import { withSSRAuth } from "../utils/withSSRAuth"
import { setupAPIClient } from "../services/api"

export default function AdminPanel() {
    
  return (
    <>
      <h1>Admin</h1>
    </>
  )
}

AdminPanel.layout = DashboardLayout

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx)
  
  return {
    props: {}
  }
}, {
  roles: ['local.admin', 'general.admin']
})
