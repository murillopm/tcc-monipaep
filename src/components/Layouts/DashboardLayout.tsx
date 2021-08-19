import { ReactNode } from "react";

interface DashboardLayoutProps {
  children: ReactNode
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <>
      <h1>External layout</h1>
      <div>
        {children}
      </div>
    </>
  )
}