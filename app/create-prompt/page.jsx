'use client'

import { useState, useCallback } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Form from '@components/Form'

const CreatePrompt = () => {
  const [submitting, setSubmitting] = useState(false)
  const [post, setPost] = useState({ prompt: '', tag: '' })

  const router = useRouter()
  const { data: session } = useSession()

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault()
      setSubmitting(true)

      try {
        const response = await fetch('/api/prompt/new', {
          method: 'POST',
          body: JSON.stringify({
            prompt: post.prompt,
            userId: session?.user.id,
            tag: post.tag,
          }),
        })

        if (response.ok) {
          router.push('/')
        }
      } catch (error) {
        console.log(error)
      } finally {
        setSubmitting(false)
      }
    },
    [post.prompt, session?.user.id, post.tag]
  )

  return (
    <Form
      type='Create'
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={handleSubmit}
    ></Form>
  )
}

export default CreatePrompt
