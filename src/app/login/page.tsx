'use client'
import React, { useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import axios, { Axios } from 'axios' 
import toast from 'react-hot-toast'
import { signIn } from 'next-auth/react'; // Import signIn function



function LoginPage() {
  const router = useRouter();
const [user,setUser] =React.useState ({
    username : "",
    password :""
})

const [buttonDisabled,setbuttonDisabled] = React.useState(false);

const [loading,setLoading] =React.useState(false)

//  const onLogin =async()=>{
//   try{
//     setLoading(true);
//    const  response = await  axios.post("/api/users/login",user);
//    console.log(response);
//    toast.success("Login Sucessfully")

//      if(response.status == 200)
//       {
//         toast.success(" sucessfully ")
     
//       }
//    console.log("signup sucessfully");
//    router.push("/profile");

//   }
//   catch(error:any)
//   {
//     console.log("signup failed pleaseesee",error)
//   } finally {
//     setLoading(false);
//   }
  
//  }


const onLogin = async () => {
  try {
    setLoading(true);

    // Use signIn function from NextAuth.js
    const response:any = await signIn('credentials', {
      redirect: false, // Prevent automatic redirection
      username: user.username,
      password: user.password,
    });
      console.log(response)

    if (response.error) {
      console.error('Login error:', response.error);
      toast.error('Login failed. Please check your credentials.');
    } else {
      console.log('Login successful:', response);
      toast.success('Login successful!');
      router.push('/profile'); // Redirect to profile page
    }
  } catch (error:any) {
    console.error('Login error:', error.message);
    toast.error('An unexpected error occurred. Please try again.');
  } finally {
    setLoading(false);
  }
};



 useEffect(()=>{
  if(user.username.length > 0 && user.password.length>0)
    {
      setbuttonDisabled(false);
    }
    else 
    {
      setbuttonDisabled(true)
    }

 },[user])
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
              <h1 className='text-center text-white text-2xl'>{loading ? " Processing": "Sign Up"}</h1>

        <div className='flex m-5'>
        <h1 className='text-center text-white text-2xl'>Login</h1>
        </div>
        <div className='p-4 m-3'>
        <label  htmlFor='username' className='text-white p-4'>username</label>
        <input
        className='p-4 border-gray-300  rounded-lg mb-4  focus:outline-none focus:border-gray-600'
          type="text" 
          id='username'
          value={user.username}
          onChange={(e)=>setUser({...user,username:e.target.value})}
          placeholder='username'
          />
        </div>
            <div>
            <label  htmlFor='password' className='text-white  p-4'>password</label>
        <input
        className='p-4 border-gray-300  rounded-lg mb-4  focus:outline-none focus:border-gray-600'
          type="text" 
          id='password'
          value={user.password}
          onChange={(e)=>setUser({...user,password:e.target.value})}
          placeholder='password'
          />
            </div>
          <div className='flex justify-end m-4'>
          <button 
          onClick={onLogin}
          className=' bg-cyan-900 p-4 border-gray-300  rounded-lg mb-4  focus:outline-none focus:border-gray-600'
          >{buttonDisabled ? " Nosig Up" : " Login"}</button>
    
          </div>
     
 

        
    </div>
  )
}

export default LoginPage
