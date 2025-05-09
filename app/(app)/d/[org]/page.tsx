import { Main } from "@/components/ds"

export default async function Page({ params }: { params: { org: string } }) {
  const usableParams = await params

  return (
    <Main>
      <h1>Dashboard</h1>
      <h2>Current Organization: {usableParams.org}</h2>
    </Main>
  )
}
