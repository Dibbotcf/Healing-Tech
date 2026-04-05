import { Link } from "react-router";

export function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 font-['Arimo'] px-4">
      <div className="text-center">
        <h1 className="text-[#00355D] text-6xl font-bold mb-4">404</h1>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Page Not Found</h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link 
          to="/" 
          className="bg-[#12B5CB] hover:bg-[#009EE2] text-white px-8 py-3 rounded-full font-bold transition-colors inline-block"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
