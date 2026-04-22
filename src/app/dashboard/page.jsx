import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react';

const dashPage = async() => {
  const session = await auth.api.getSession({
    headers: await headers()
  })
  console.log('session data', session);
  const user = session?.user
  if (!user) {
    redirect('/auth/signin')
    return <div>Please sign in to access the dashboard</div>
    
  }
  return (
    <div>
      dashPage
    </div>
  );
};

export default dashPage;