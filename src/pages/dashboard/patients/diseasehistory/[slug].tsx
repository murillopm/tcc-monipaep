import { withSSRAuth } from "../../../../utils/withSSRAuth";
import { PatientDataWrapper } from "../../../../components/Layouts/PatientDataWrapper";
import DashboardLayout from "../../../../components/Layouts/DashboardLayout";

interface DiseaseHistoryProps {
  patientId: string;
}

export default function DiseaseHistory({ patientId }: DiseaseHistoryProps) {
  return (
    <PatientDataWrapper id={patientId}>
      <p>b</p>
    </PatientDataWrapper>
  )
}

DiseaseHistory.layout = DashboardLayout

export const getServerSideProps = withSSRAuth(async (ctx) => { 
  const params = ctx.params
  return { 
    props: { 
      patientId: params?.slug 
    } 
  }
})