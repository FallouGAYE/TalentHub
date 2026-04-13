'use client';

import { api } from '@/lib/api';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

export default function RegisterPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('USER');
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await api.post('/auth/register', {
        email,
        password,
        role,
      });

      router.push('/login');
    } catch {
      setError('Registration failed');
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-md flex-col gap-4 rounded border p-6"
      >
        <h1 className="text-2xl font-bold">Register</h1>

        <input
          type="email"
          placeholder="Email"
          className="rounded border p-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="rounded border p-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <select
          className="rounded border p-3"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="USER">USER</option>
          <option value="RECRUITER">RECRUITER</option>
        </select>

        {error && <p className="text-red-500">{error}</p>}

        <button type="submit" className="rounded bg-black p-3 text-white">
          Create account
        </button>

        <Link href="/login" className="text-sm text-blue-600">
          Already have an account? Login
        </Link>
      </form>
    </main>
  );
}