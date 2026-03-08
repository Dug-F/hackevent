import { getPayload } from 'payload'
import config from '@/payload.config'

export async function getActiveProjects() {
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'projects',
    where: {
      active: {
        equals: true,
      },
    },
    sort: 'title',
  })

  return result.docs
}