
'use client';

import { signOut } from 'next-auth/react';

export default function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: '/', redirect: true })}
      className="px-3 py-2 rounded-md"
    >
      Sign out
    </button>
  );
}
