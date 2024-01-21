import { getJournals } from '@/actions'
import HomePageClient from './HomePageClient'

const UserHomePage = async () => {
  const { data: journals } = await getJournals()

  return <HomePageClient journals={journals} />
}

export default UserHomePage
