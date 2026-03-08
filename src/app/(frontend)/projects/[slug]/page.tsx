import { getPayload } from 'payload'
import config from '@/payload.config'
import { notFound } from 'next/navigation'
import { RichText } from '@payloadcms/richtext-lexical/react'

type Props = {
  params: Promise<{
    slug: string
  }>
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params

  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'projects',
    where: {
      slug: { equals: slug },
      active: { equals: true },
    },
    limit: 1,
  })

  if (result.totalDocs === 0) {
    notFound()
  }

  const project = result.docs[0]


  
  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-4xl mx-auto">

        <h1 className="text-4xl font-bold mb-6">
          {project.title}
        </h1>

        {project.summary && (
          <p className="mb-8 text-lg opacity-80">
            {project.summary}
          </p>
        )}

        {project.body && (
          <div className="prose dark:prose-invert max-w-none">
            <RichText data={project.body} />
          </div>
        )}

      </div>
    </div>
  )
}
