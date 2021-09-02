import { ReactNode, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

interface DashboardLayoutProps {
  children: ReactNode
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { signOut } = useContext(AuthContext)
  
  return (
    <>
      <h1>External layout</h1>
      <button onClick={signOut}>Sign out</button>
      <div>
        {children}
      </div>
    </>
  )
}

export default DashboardLayout