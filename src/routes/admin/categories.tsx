import AdminLayout from '@/components/admin/admin-layout'
import CategoriesPage from '@/components/admin/categories'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/categories')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
 <AdminLayout>
   <CategoriesPage/>
       <Outlet />
     </AdminLayout>
     )
}
