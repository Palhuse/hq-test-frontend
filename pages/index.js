export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-8">
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-xl p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">Velkommen til HQ Testmiljø</h1>
        <p className="text-base text-gray-700 mb-6 text-center">
          Dette er et demo-dashboard for ekstern test av SaaS-løsningen. Når URL og innlogging er aktivert,
          vil du kunne logge inn her.
        </p>
        <div className="flex justify-center">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl shadow"
            disabled
          >
            Logg inn (deaktivert)
          </button>
        </div>
        <div className="mt-6 text-sm text-gray-500 text-center">
          Versjon: 1.0.0 • Teststatus: Ikke koblet til backend
        </div>
      </div>
    </div>
  );
}
