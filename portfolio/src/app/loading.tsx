export default function Loading() {
  return (
    <div className="min-h-screen bg-primary flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        {/* Logo spinner */}
        <div className="relative">
          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center animate-pulse">
            <span className="text-white font-bold text-2xl">N</span>
          </div>
          <div className="absolute -inset-2 rounded-xl border-2 border-blue-500/30 animate-ping" />
        </div>

        {/* Loading text */}
        <p className="text-gray-400 text-sm animate-pulse">Loading...</p>
      </div>
    </div>
  );
}
