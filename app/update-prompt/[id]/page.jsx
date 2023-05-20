'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import Form from '@components/Form';

const UpdatePrompt = ({ params }) => {
  const router = useRouter();
  const { id: promptId } = params;

  const [post, setPost] = useState({ prompt: '', tag: '' });
  const [submitting, setIsSubmitting] = useState(false);

  const getPromptDetails = async () => {
    try {
      const response = await fetch(`/api/prompt/${promptId}`);
      if (!response.ok) {
        throw Error('Error occurred during fetching prompt!');
      }
      const data = await response.json();
      setPost({
        prompt: data.prompt,
        tag: data.tag,
      });
    } catch (error) {
      console.error('Error in getPromptDetails:', error);
    }
  };

  useEffect(() => {
    if (promptId) getPromptDetails();
  }, [promptId]);

  const updatePrompt = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!promptId) return alert('Missing PromptId!');

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push('/');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  );
};

export default UpdatePrompt;
