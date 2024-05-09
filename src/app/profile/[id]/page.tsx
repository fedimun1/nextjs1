import React from 'react'

function UserProfilePage({params}:any) {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1 className='text-white'>Profile</h1>
      <hr />
      <h1 className='text-4xl text-white'>Profile Page {params.id}</h1>

    </div>
  )
}

export default UserProfilePage
