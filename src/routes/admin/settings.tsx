import AdminLayout from '@/components/admin/admin-layout'
// import CategoryPage from '@/components/admin/settingsPage'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/settings')({
  component: RouteComponent,
})

function RouteComponent() {
  return(
   <AdminLayout>
    {/* <CategoryPage/> */}
          <Outlet />
        </AdminLayout>
        )
   }
