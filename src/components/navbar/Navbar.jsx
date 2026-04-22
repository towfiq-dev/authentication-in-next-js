'use client'
import { signOut, useSession } from '@/lib/auth-client';
import Link from 'next/link';
import React from 'react';
import { toast } from 'react-toastify';
import Structure from './Structure';

const Navbar = () => {
  const {data, isPending} = useSession()
  if (isPending) {
    return (
    <div>
      Loading.....
    </div>
    )
  }
  //console.log('Navabr' , data);
  const user = data?.user;
  
  return (
    <nav className="sticky top-0 z-40 w-full border-b border-separator bg-background/70 backdrop-blur-lg">
  <header className="flex h-16 items-center justify-between px-6">
    <div className="flex items-center gap-3">
      
      <p className="font-bold">ACME</p>
    </div>
    <ul className="flex items-center gap-4">
      <Structure href="/">Home</Structure>
      <Structure href="/about">Pricing</Structure>
      <Structure href="/dashboard">DashBoard</Structure>
    </ul>
    <div>
      {
        user? 
        <>
        <p>Welcome {user.name}</p>
        <button onClick={()=> signOut()}
        className='cursor-pointer font-semibold shadow-md rounded bg-red-500 text-white px-3 py-1'>
          Sign Out
        </button>
        </>
        :
        <Link className='font-semibold shadow-md rounded bg-red-500 text-white px-3 py-1' href={'/auth/signin'}>
        Sign In
        </Link>
      }
    </div>
  </header>
</nav>
  );
};

export default Navbar;