import AdminLayout from '@/components/admin/admin-layout'
import ProductsPage from '@/components/admin/productsPage'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/product')({
  component: RouteComponent,
})

function RouteComponent() {
  return(
  <AdminLayout>
    <ProductsPage />
         <Outlet />
       </AdminLayout>
       )
  }