import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <section className="mx-auto flex max-w-6xl flex-col items-center px-6 py-24 text-center">
        <div className="mb-6 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm text-gray-600 shadow-sm">
          Réseau social professionnel + plateforme d’emploi
        </div>

        <h1 className="max-w-4xl text-5xl font-bold tracking-tight text-black md:text-6xl">
          Construis ton réseau, partage tes idées, trouve des opportunités.
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600">
          TalentHub est une plateforme inspirée de LinkedIn et Indeed pour publier,
          collaborer, suivre d’autres profils et découvrir des offres d’emploi.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/login"
            className="rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Se connecter
          </Link>

          <Link
            href="/register"
            className="rounded-full border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-gray-100"
          >
            Créer un compte
          </Link>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-6 pb-20 md:grid-cols-3">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Partage</h2>
          <p className="mt-3 text-gray-600">
            Publie des posts, échange avec ta communauté et construis ta présence.
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Réseau</h2>
          <p className="mt-3 text-gray-600">
            Suis d’autres profils et découvre un feed personnalisé.
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Opportunités</h2>
          <p className="mt-3 text-gray-600">
            Parcours des offres et postule facilement selon ton profil.
          </p>
        </div>
      </section>
    </main>
  );
}