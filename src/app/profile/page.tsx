'use client'
import axios from 'axios';
import React from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';

function UserProfile() {
  const router = useRouter();
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (status === 'authenticated') {
    const logout = async () => {
      try {
        await signOut({ redirect: false }); // Prevent automatic redirection
        toast.success('Successfully logged out!');
        router.push('/login'); // Redirect to home page after logout
      } catch (error) {
        console.error('Logout error:', error);
        toast.error('An unexpected error occurred. Please try again.');
      }
    };

    return (
      <div>
        <h1 className='text-white'>Profile</h1>
        <h1 className='text-white'>Profile Page</h1>
        <hr />
        <button
          onClick={logout}
          className='bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        >
          Logout
        </button>
      </div>
    );
  }

  return <p>You are not logged in.</p>;
}

export default UserProfile;
