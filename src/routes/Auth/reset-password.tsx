import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/Auth/reset-password')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/Auth/reset-password"!</div>
}
