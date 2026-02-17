import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

      <div className="max-w-2xl w-full text-center relative z-10">
        <div className="mb-12">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent mb-4 animate-pulse">
            PrimeTradeAI
          </h1>
          <p className="text-2xl text-slate-300 font-light">Task Management Dashboard</p>
          <p className="text-slate-500 mt-2">Boost your productivity with intelligent task management</p>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-12">
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 backdrop-blur-sm hover:border-blue-500/50 transition-colors">
            <div className="text-2xl mb-2">⚡</div>
            <p className="text-sm text-slate-400">Fast & Responsive</p>
          </div>
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 backdrop-blur-sm hover:border-blue-500/50 transition-colors">
            <div className="text-2xl mb-2">🔒</div>
            <p className="text-sm text-slate-400">Secure & Private</p>
          </div>
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 backdrop-blur-sm hover:border-blue-500/50 transition-colors">
            <div className="text-2xl mb-2">📊</div>
            <p className="text-sm text-slate-400">Smart Analytics</p>
          </div>
        </div>

        <div className="space-y-3 max-w-sm mx-auto">
          <a href="/login" className="block">
            <button
              type="button"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 cursor-pointer text-lg"
            >
              Login to Account
            </button>
          </a>
          <a href="/signup" className="block">
            <button
              type="button"
              className="w-full bg-slate-700 text-slate-100 px-6 py-4 rounded-lg font-semibold hover:bg-slate-600 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 cursor-pointer text-lg border border-slate-600"
            >
              Create New Account
            </button>
          </a>
        </div>

        <div className="mt-12 text-slate-500 text-sm">
          <p>Secure authentication with JWT tokens • Data stored safely in MongoDB</p>
        </div>
      </div>
    </div>
  );
}
