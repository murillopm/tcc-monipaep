import DashboardLayout from "../../../../components/Layouts/DashboardLayout";
import { withSSRAuth } from "../../../../utils/withSSRAuth";

export default function PatientInfo() {
  return (
    <p>a</p>
  )
}

PatientInfo.layout = DashboardLayout

export const getServerSideProps = withSSRAuth(async (ctx) => { 
  console.log(ctx.params)
  return { props: {} }
})