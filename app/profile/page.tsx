export default function Profile() {
  return (
    <div className="min-h-screen px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <header className="space-y-3 mb-8">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            Profile 👤
          </h1>
          <p className="text-base text-gray-700">
            Manage your profile settings and preferences
          </p>
        </header>

        <div className="rounded-2xl border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50 p-8 shadow-lg">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="h-20 w-20 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center text-3xl font-bold text-white shadow-lg">
                👤
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Your Profile</h2>
                <p className="text-sm text-blue-600">Welcome to NewVision!</p>
              </div>
            </div>
            
            <div className="mt-6 space-y-3">
              <div className="rounded-xl border-2 border-blue-200 bg-white p-4">
                <p className="text-sm font-semibold text-blue-700 mb-1">Email</p>
                <p className="text-gray-700">user@example.com</p>
              </div>
              <div className="rounded-xl border-2 border-cyan-200 bg-white p-4">
                <p className="text-sm font-semibold text-cyan-700 mb-1">Status</p>
                <p className="text-gray-700">Active ✨</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

