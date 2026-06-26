import { SignUp } from '@clerk/nextjs'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export default function Page() {
  const { userId } = auth();
  if (userId) {
    redirect('/dashboard');
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-black p-4">
      <SignUp forceRedirectUrl="/dashboard" />
    </div>
  );
}
