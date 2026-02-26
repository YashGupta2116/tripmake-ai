import { getSessionFn } from '@/data/session'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard')({
  component: RouteComponent,
  loader: async () => {
    const session = await getSessionFn()
    return session
  },
})

function RouteComponent() {
  const session = Route.useLoaderData()

  return <div>Hello {session.user.name}</div>
}
