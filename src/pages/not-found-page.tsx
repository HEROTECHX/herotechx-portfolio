// src/pages/NotFound.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function NotFoundPage() {
  const [countdown, setCountdown] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if there's a redirect path stored
    const redirectPath = sessionStorage.getItem('redirectPath');
    
    if (redirectPath) {
      sessionStorage.removeItem('redirectPath');
      navigate(redirectPath, { replace: true });
      return;
    }

    // Countdown timer
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate('/', { replace: true });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* Animated 404 */}
        <div className="relative">
          <h1 className="text-9xl font-bold text-white opacity-10 select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-6xl animate-bounce">🔍</div>
          </div>
        </div>

        {/* Error Message */}
        <div className="mt-8 space-y-4">
          <h2 className="text-4xl font-bold text-white">
            Page Not Found
          </h2>
          <p className="text-xl text-blue-200">
            Oops! The page you're looking for seems to have wandered off into the digital void.
          </p>
        </div>

        {/* Countdown and Actions */}
        <div className="mt-12 space-y-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <p className="text-white text-lg">
              Redirecting to homepage in{' '}
              <span className="font-bold text-yellow-300 text-2xl">
                {countdown}
              </span>{' '}
              seconds...
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/', { replace: true })}
              className="px-8 py-3 bg-white text-purple-900 rounded-lg font-semibold hover:bg-blue-100 transition-colors duration-200 shadow-lg"
            >
              Go Home Now
            </button>
            <button
              onClick={() => navigate(-1)}
              className="px-8 py-3 bg-transparent text-white border-2 border-white rounded-lg font-semibold hover:bg-white/10 transition-colors duration-200"
            >
              Go Back
            </button>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="mt-16 flex justify-center gap-8 text-4xl opacity-20">
          <span className="animate-pulse">⭐</span>
          <span className="animate-pulse" style={{ animationDelay: '100ms' }}>✨</span>
          <span className="animate-pulse" style={{ animationDelay: '200ms' }}>💫</span>
        </div>
      </div>
    </div>
  );
}