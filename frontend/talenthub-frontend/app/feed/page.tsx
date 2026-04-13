'use client';

import Navbar from '@/components/Navbar';
import { api } from '@/lib/api';
import { useEffect, useState } from 'react';

type Comment = {
  id: string;
  content: string;
  createdAt: string;
  author?: {
    email?: string;
    profile?: {
      firstName?: string;
      lastName?: string;
    };
  };
};

type Post = {
  id: string;
  content: string;
  createdAt: string;
  likes?: { userId: string; postId: string }[];
  comments?: Comment[];
  author: {
    email: string;
    profile?: {
      firstName?: string;
      lastName?: string;
      title?: string;
    };
  };
};

export default function FeedPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});

  const loadFeed = async () => {
    try {
      const response = await api.get('/posts/feed');
      setPosts(response.data);
      setError('');
    } catch {
      setError('Impossible de charger le feed');
    }
  };

  const createPost = async () => {
    if (!content.trim()) return;

    try {
      await api.post('/posts', { content });
      setContent('');
      await loadFeed();
    } catch {
      setError('Impossible de publier le post');
    }
  };

  const likePost = async (postId: string) => {
    try {
      await api.post(`/posts/${postId}/like`);
      await loadFeed();
    } catch {
      setError('Impossible de liker ce post');
    }
  };

  const addComment = async (postId: string) => {
    const comment = commentInputs[postId]?.trim();

    if (!comment) return;

    try {
      await api.post(`/posts/${postId}/comments`, {
        content: comment,
      });

      setCommentInputs((prev) => ({
        ...prev,
        [postId]: '',
      }));

      await loadFeed();
    } catch {
      setError('Impossible d’ajouter le commentaire');
    }
  };

  useEffect(() => {
    loadFeed();
  }, []);

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="mx-auto grid max-w-6xl gap-6 px-6 py-8 md:grid-cols-[260px_minmax(0,1fr)]">
        <aside className="hidden h-fit rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:block">
          <h2 className="text-lg font-semibold">TalentHub</h2>
          <p className="mt-3 text-sm leading-6 text-gray-600">
            Ton espace pour publier, suivre les autres et construire ton profil pro.
          </p>
        </aside>

        <section className="flex flex-col gap-6">
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <h1 className="mb-4 text-3xl font-bold tracking-tight">Feed</h1>

            <textarea
              className="min-h-[120px] w-full rounded-2xl border border-gray-200 p-4 outline-none transition focus:border-black"
              placeholder="Partage une idée, un projet, une avancée..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />

            <div className="mt-4 flex justify-end">
              <button
                onClick={createPost}
                className="rounded-full bg-black px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
              >
                Publish
              </button>
            </div>
          </div>

          {error && (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-red-600">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-4">
            {posts.map((post) => (
              <article
                key={post.id}
                className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold text-black">
                      {post.author.profile?.firstName} {post.author.profile?.lastName}
                    </p>
                    <p className="text-sm text-gray-500">
                      {post.author.profile?.title || post.author.email}
                    </p>
                  </div>

                  <span className="text-xs text-gray-400">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <p className="mt-4 whitespace-pre-line leading-7 text-gray-800">
                  {post.content}
                </p>

                <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
                  <span>{post.likes?.length ?? 0} likes</span>
                  <span>{post.comments?.length ?? 0} comments</span>
                </div>

                <div className="mt-4">
                  <button
                    onClick={() => likePost(post.id)}
                    className="rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
                  >
                    Like
                  </button>
                </div>

                <div className="mt-6">
                  <h3 className="mb-3 text-sm font-semibold text-gray-700">
                    Commentaires
                  </h3>

                  <div className="flex flex-col gap-3">
                    {post.comments && post.comments.length > 0 ? (
                      post.comments.map((comment) => (
                        <div
                          key={comment.id}
                          className="rounded-2xl bg-gray-50 p-3"
                        >
                          <p className="text-sm font-medium text-black">
                            {comment.author?.profile?.firstName}{' '}
                            {comment.author?.profile?.lastName}
                          </p>
                          <p className="mt-1 text-sm text-gray-700">
                            {comment.content}
                          </p>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-gray-400">
                        Aucun commentaire pour le moment.
                      </p>
                    )}
                  </div>

                  <div className="mt-4 flex gap-3">
                    <input
                      className="flex-1 rounded-2xl border border-gray-200 p-3 outline-none focus:border-black"
                      placeholder="Écrire un commentaire..."
                      value={commentInputs[post.id] || ''}
                      onChange={(e) =>
                        setCommentInputs((prev) => ({
                          ...prev,
                          [post.id]: e.target.value,
                        }))
                      }
                    />

                    <button
                      onClick={() => addComment(post.id)}
                      className="rounded-full bg-black px-4 py-2 text-sm font-semibold text-white"
                    >
                      Comment
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}