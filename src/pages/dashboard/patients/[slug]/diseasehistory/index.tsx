import DashboardLayout from "../../../../../components/Layouts/DashboardLayout";
import { withSSRAuth } from "../../../../../utils/withSSRAuth";

export default function DiseaseHistory() {
  return (
    <p>b</p>
  )
}

DiseaseHistory.layout = DashboardLayout

export const getServerSideProps = withSSRAuth(async (ctx) => { 
  console.log(ctx.params)
  return { props: {} }
})