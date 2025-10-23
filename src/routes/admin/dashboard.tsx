
import AdminLayout from '@/components/admin/admin-layout'
// import DashboardPage from '@/components/admin/dashboard'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  return(
  <AdminLayout>
    {/* <DashboardPage /> */}
         <Outlet />
       </AdminLayout>
       )
  }