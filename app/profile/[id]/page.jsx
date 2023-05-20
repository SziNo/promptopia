'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

import Profile from '@components/Profile';

const UserProfile = ({ params }) => {
  const searchParams = useSearchParams();
  const userName = searchParams.get('name');

  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`/api/users/${params?.id}/posts`);
        if (!response.ok) {
          throw Error('Error occurred during fetching posts');
        }
        const data = await response.json();
        setUserPosts(data);
      } catch (error) {
        console.error('Error in fetchPosts (params.id):', error);
      }
    };

    if (params?.id) fetchPosts();
  }, [params.id]);

  return (
    <Profile
      name={userName}
      desc={`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s exceptional prompts and be inspired by the power of their imagination!`}
      data={userPosts}
    />
  );
};

export default UserProfile;
