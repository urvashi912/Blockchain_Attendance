import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, LogIn, Download } from 'lucide-react';
import { useWallet } from '../hooks/useWallet';
import { useAuth } from '../hooks/useAuth';

export default function Login() {
  const navigate = useNavigate();
  const { connect, isConnecting, error: walletError, isWalletInstalled, installUrl } = useWallet();
  const { login } = useAuth();
  const [role, setRole] = useState<'teacher' | 'student' | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    try {
      setError(null);
      if (!role) {
        setError('Please select a role');
        return;
      }

      if (!isWalletInstalled) {
        window.open(installUrl, '_blank');
        setError('Please install HashPack wallet to continue');
        return;
      }

      const walletAddress = await connect();
      if (walletAddress) {
        await login(walletAddress, role);
        navigate('/dashboard');
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to connect';
      setError(message);
      console.error('Login failed:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <div className="flex items-center justify-center mb-8">
          <GraduationCap className="h-12 w-12 text-indigo-600" />
          <h1 className="ml-3 text-3xl font-bold text-gray-900">BlockAttend</h1>
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Choose Your Role</h2>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setRole('teacher')}
                className={`p-4 rounded-lg border-2 text-center transition-all ${
                  role === 'teacher'
                    ? 'border-indigo-600 bg-indigo-50 text-indigo-600'
                    : 'border-gray-200 hover:border-indigo-200'
                }`}
              >
                <span className="block font-medium">Teacher</span>
              </button>
              <button
                onClick={() => setRole('student')}
                className={`p-4 rounded-lg border-2 text-center transition-all ${
                  role === 'student'
                    ? 'border-indigo-600 bg-indigo-50 text-indigo-600'
                    : 'border-gray-200 hover:border-indigo-200'
                }`}
              >
                <span className="block font-medium">Student</span>
              </button>
            </div>
          </div>

          {!isWalletInstalled && (
            <a
              href={installUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center px-4 py-3 rounded-md bg-green-600 text-white font-medium hover:bg-green-700 transition-colors"
            >
              <Download className="h-5 w-5 mr-2" />
              Install HashPack Wallet
            </a>
          )}

          <button
            onClick={handleLogin}
            disabled={!role || isConnecting}
            className={`w-full flex items-center justify-center px-4 py-3 rounded-md text-white font-medium transition-colors ${
              role && !isConnecting
                ? 'bg-indigo-600 hover:bg-indigo-700'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            <LogIn className="h-5 w-5 mr-2" />
            {isConnecting ? 'Connecting...' : 'Connect Wallet & Login'}
          </button>

          {(error || walletError) && (
            <div className="p-3 rounded-md bg-red-50 border border-red-200">
              <p className="text-red-600 text-sm text-center">
                {error || walletError}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}