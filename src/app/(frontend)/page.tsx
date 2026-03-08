import { getPayload } from 'payload'
import config from '@/payload.config'
import { RichText } from '@payloadcms/richtext-lexical/react'

import { generateMetadata } from './[slug]/page'

export { generateMetadata }

export default async function HomePage() {
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'homepage',
    limit: 1,
  })

  const content = result.docs[0] ?? {}

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
      {/* Hero */}
      <section className="py-24 text-center bg-gradient-to-b from-blue-600 to-blue-500 text-white">
        <h1 className="text-5xl font-bold mb-4">{content.title}</h1>

        <p className="text-lg opacity-90">{content.eventDate}</p>
      </section>

      {/* Content container */}
      <div className="max-w-4xl mx-auto px-6 py-16 space-y-12">
        {/* Purpose */}
        <section className="bg-white dark:bg-zinc-900 rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-semibold mb-6">Purpose of the Hack Event</h2>

          {content.purpose && (
            <div className="prose dark:prose-invert max-w-none">
              <RichText data={content.purpose} />
            </div>
          )}
        </section>

        {/* Environment reminder */}
        <section className="bg-white dark:bg-zinc-900 rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-semibold mb-4">Environment Reminder</h2>

          {content.environmentNotes && (
            <div className="prose dark:prose-invert max-w-none mb-4">
              <RichText data={content.environmentNotes} />
            </div>
          )}

          {content.environmentCommands && (
            <pre className="bg-zinc-100 dark:bg-zinc-950 p-4 rounded text-sm overflow-x-auto">
              <code>{content.environmentCommands}</code>
            </pre>
          )}
        </section>
      </div>
    </main>
  )
}
