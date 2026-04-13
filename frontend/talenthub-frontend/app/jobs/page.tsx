'use client';

import Navbar from '@/components/Navbar';
import { api } from '@/lib/api';
import { useEffect, useState } from 'react';

type Job = {
  id: string;
  title: string;
  description: string;
  location?: string;
  contractType?: string;
  recruiter?: {
    email: string;
    profile?: {
      firstName?: string;
      lastName?: string;
    };
  };
};

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [contractType, setContractType] = useState('');
  const [error, setError] = useState('');

  const loadJobs = async () => {
    try {
      const response = await api.get('/jobs');
      setJobs(response.data);
    } catch {
      setError('Unable to load jobs');
    }
  };

  const createJob = async () => {
    if (!title.trim() || !description.trim()) return;

    try {
      await api.post('/jobs', {
        title,
        description,
        location,
        contractType,
      });

      setTitle('');
      setDescription('');
      setLocation('');
      setContractType('');
      loadJobs();
    } catch {
      setError('Unable to create job');
    }
  };

  const applyToJob = async (jobId: string) => {
    try {
      await api.post(`/jobs/${jobId}/apply`, {});
      alert('Application sent');
    } catch {
      alert('Unable to apply');
    }
  };

  useEffect(() => {
    loadJobs();
  }, []);

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="mx-auto grid max-w-6xl gap-6 px-6 py-8 md:grid-cols-[360px_minmax(0,1fr)]">
        <section className="h-fit rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-bold">Create a job</h1>

          <input
            className="mt-4 w-full rounded-2xl border border-gray-200 p-3 outline-none focus:border-black"
            placeholder="Job title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            className="mt-3 min-h-[140px] w-full rounded-2xl border border-gray-200 p-3 outline-none focus:border-black"
            placeholder="Job description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <input
            className="mt-3 w-full rounded-2xl border border-gray-200 p-3 outline-none focus:border-black"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <input
            className="mt-3 w-full rounded-2xl border border-gray-200 p-3 outline-none focus:border-black"
            placeholder="Contract type"
            value={contractType}
            onChange={(e) => setContractType(e.target.value)}
          />

          <button
            onClick={createJob}
            className="mt-4 rounded-full bg-black px-5 py-2.5 text-sm font-semibold text-white"
          >
            Publish job
          </button>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-3xl font-bold tracking-tight">Jobs</h2>

          {error && (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-red-600">
              {error}
            </div>
          )}

          {jobs.map((job) => (
            <article
              key={job.id}
              className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
            >
              <h3 className="text-xl font-semibold">{job.title}</h3>

              <p className="mt-1 text-sm text-gray-500">
                {job.location || 'No location'}{' '}
                {job.contractType ? `• ${job.contractType}` : ''}
              </p>

              <p className="mt-4 leading-7 text-gray-700">{job.description}</p>

              <p className="mt-4 text-sm text-gray-500">
                Recruiter:{' '}
                {job.recruiter?.profile?.firstName || job.recruiter?.email}
              </p>

              <button
                onClick={() => applyToJob(job.id)}
                className="mt-4 rounded-full bg-black px-5 py-2.5 text-sm font-semibold text-white"
              >
                Apply
              </button>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}