import { useState } from 'react';
import { useAuth } from '../context/auth-context';
import { LabelInputContainer } from '../components/ui/label-input-container';
import { Input } from './ui/input';
import { Loading } from './loading';
import { Label } from './ui/label';

export function SignInModal() {
  // const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { signIn } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // if (isSignUp) {
      //   await signUp(email, password);
      // } else {
      // }
      await signIn(email, password);
    } catch (err) {
      const error = err as { message: string};
      setError(error.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-zinc-900 rounded-lg max-w-md w-full p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {/* {isSignUp ? 'Create Admin Account' : 'Admin Sign In'} */}
          Admin Sign In
        </h2>

        <form onSubmit={handleSubmit} className="my-8">
          <LabelInputContainer className="mb-4 capitalize">
            <Label htmlFor="email">admin email</Label>
            <Input
              id="email"
              name="email"
              placeholder="example@mail.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required                
            />
          </LabelInputContainer>

          <LabelInputContainer className="mb-4 capitalize">
            <Label htmlFor="password">admin password</Label>
            <Input
              id="password"
              name="password"
              placeholder="********"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required                
            />
          </LabelInputContainer>
              
          

          {error && (
            <div className="text-red-600 text-sm bg-red-50 p-2 rounded">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {loading ? <Loading /> : 'Sign In'}
          </button>
        </form>

        {/* <div className="mt-4 text-center">
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-blue-600 hover:text-blue-500 text-sm"
          >
            {isSignUp 
              ? 'Already have an account? Sign In' 
              : "Don't have an account? Sign Up"
            }
          </button>
        </div> */}
      </div>
    </div>
  );
}