'use client';

import Navbar from '@/components/Navbar';
import { api } from '@/lib/api';
import { useEffect, useState } from 'react';

type Profile = {
  firstName?: string;
  lastName?: string;
  title?: string;
  bio?: string;
  location?: string;
  avatarUrl?: string;
};

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile>({
    firstName: '',
    lastName: '',
    title: '',
    bio: '',
    location: '',
    avatarUrl: '',
  });

  const [message, setMessage] = useState('');

  const loadProfile = async () => {
    try {
      const response = await api.get('/profiles/me');

      if (response.data?.profile === null) {
        return;
      }

      setProfile(response.data);
    } catch {
      setMessage('Unable to load profile');
    }
  };

  const saveProfile = async () => {
    try {
      await api.patch('/profiles/me', profile);
      setMessage('Profile updated');
    } catch {
      setMessage('Unable to update profile');
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="mx-auto max-w-4xl px-6 py-8">
        <div className="mb-6 rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
          <div className="flex items-center gap-5">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-black text-2xl font-bold text-white">
              {(profile.firstName?.[0] || 'T').toUpperCase()}
            </div>

            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                {profile.firstName || 'Your'} {profile.lastName || 'Profile'}
              </h1>
              <p className="mt-1 text-gray-500">{profile.title || 'No title yet'}</p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
          <h2 className="mb-6 text-2xl font-semibold">Edit profile</h2>

          <div className="grid gap-4 md:grid-cols-2">
            <input
              className="rounded-2xl border border-gray-200 p-3 outline-none focus:border-black"
              placeholder="First name"
              value={profile.firstName || ''}
              onChange={(e) =>
                setProfile({ ...profile, firstName: e.target.value })
              }
            />

            <input
              className="rounded-2xl border border-gray-200 p-3 outline-none focus:border-black"
              placeholder="Last name"
              value={profile.lastName || ''}
              onChange={(e) =>
                setProfile({ ...profile, lastName: e.target.value })
              }
            />
          </div>

          <input
            className="mt-4 w-full rounded-2xl border border-gray-200 p-3 outline-none focus:border-black"
            placeholder="Title"
            value={profile.title || ''}
            onChange={(e) =>
              setProfile({ ...profile, title: e.target.value })
            }
          />

          <textarea
            className="mt-4 min-h-[140px] w-full rounded-2xl border border-gray-200 p-3 outline-none focus:border-black"
            placeholder="Bio"
            value={profile.bio || ''}
            onChange={(e) =>
              setProfile({ ...profile, bio: e.target.value })
            }
          />

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <input
              className="rounded-2xl border border-gray-200 p-3 outline-none focus:border-black"
              placeholder="Location"
              value={profile.location || ''}
              onChange={(e) =>
                setProfile({ ...profile, location: e.target.value })
              }
            />

            <input
              className="rounded-2xl border border-gray-200 p-3 outline-none focus:border-black"
              placeholder="Avatar URL"
              value={profile.avatarUrl || ''}
              onChange={(e) =>
                setProfile({ ...profile, avatarUrl: e.target.value })
              }
            />
          </div>

          <div className="mt-6 flex items-center gap-4">
            <button
              onClick={saveProfile}
              className="rounded-full bg-black px-5 py-2.5 text-sm font-semibold text-white"
            >
              Save profile
            </button>

            {message && <p className="text-sm text-gray-600">{message}</p>}
          </div>
        </div>
      </div>
    </main>
  );
}