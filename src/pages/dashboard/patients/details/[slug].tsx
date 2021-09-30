import { withSSRAuth } from "../../../../utils/withSSRAuth";
import { PatientDataWrapper } from "../../../../components/Layouts/PatientDataWrapper"
import DashboardLayout from "../../../../components/Layouts/DashboardLayout";

interface PatientDetailsProps {
  patientId: string;
}

export default function PatientDetails({ patientId }: PatientDetailsProps) {
  return (
    <PatientDataWrapper id={patientId}>
      <p>a</p>  
    </PatientDataWrapper>
  )
}

PatientDetails.layout = DashboardLayout

export const getServerSideProps = withSSRAuth(async (ctx) => { 
  const params = ctx.params
  return { 
    props: { 
      patientId: params?.slug 
    } 
  }
})