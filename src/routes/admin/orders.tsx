import AdminLayout from '@/components/admin/admin-layout'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/orders')({
  component: RouteComponent,
})

function RouteComponent() {
   return(
    <AdminLayout>
           <Outlet />
         </AdminLayout>
         )
    }

