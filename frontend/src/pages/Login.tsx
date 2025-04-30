import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import { Button } from '@shadcn/ui/button';
import { Input } from '@shadcn/ui/input';
import { Loader2, Mail, Lock, Google } from 'lucide-react';

const Login: React.FC = () => {
  const { user, login, loginWithGoogle, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  if (user) return <Navigate to="/dashboard" replace />;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const res = await login(email, password);
    if (!res) setError('Invalid email or password');
  };

  const handleGoogle = async () => {
    setError('');
    const res = await loginWithGoogle();
    if (!res) setError('Google sign-in failed');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md p-8 bg-white dark:bg-zinc-900 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign in to SkillSwap</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
              <Input
                type="email"
                className="pl-10"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                placeholder="you@email.com"
              />
            </div>
          </div>
          <div>
            <label className="block mb-1 font-medium">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
              <Input
                type="password"
                className="pl-10"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                placeholder="••••••••"
              />
            </div>
          </div>
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? <Loader2 className="animate-spin mr-2" size={18} /> : null}
            Sign In
          </Button>
        </form>
        <div className="my-4 flex items-center justify-center">
          <span className="text-zinc-400 text-xs">or</span>
        </div>
        <Button variant="outline" className="w-full flex items-center justify-center" onClick={handleGoogle} disabled={loading}>
          <Google className="mr-2" size={18} /> Sign in with Google
        </Button>
        <div className="mt-6 text-center text-sm">
          Don&apos;t have an account?{' '}
          <Link to="/signup" className="text-primary underline">Sign up</Link>
        </div>
      </div>
    </div>
  );
};

export default Login; 