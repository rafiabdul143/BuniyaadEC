import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Loader2 } from 'lucide-react';
import { AuthLayout } from '../../components/layouts/AuthLayout';
import { AuthInput } from '../../components/auth/AuthInput';

export const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API Call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    setIsSubmitted(true);
  };

  return (
    <AuthLayout>
      {/* Pull card upward to align top with the left branding section */}
      <div className="-mt-6 sm:-mt-14 w-full">
        <div className="bg-white rounded-2xl border border-slate-200/80 p-8 shadow-xs sm:shadow-auth-card">
          
          {/* Top Back Navigation Link */}
          <div className="mb-4">
            <Link
              to="/login"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Back to Sign in</span>
            </Link>
          </div>

          <div className="mb-6 space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
              Recover access
            </h2>
            <p className="text-sm text-slate-500">
              Enter your verified work email address to receive recovery instructions.
            </p>
          </div>

          {isSubmitted ? (
            <div className="space-y-4 text-center py-2">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <CheckCircle2 className="h-6 w-6" aria-hidden="true" />
              </div>

              <div className="space-y-1">
                <h3 className="text-base font-semibold text-slate-900">
                  Recovery email dispatched
                </h3>
                <p className="text-sm leading-relaxed text-slate-500">
                  If an account exists for{' '}
                  <span className="font-semibold text-slate-800">{email}</span>,
                  you will receive password reset instructions shortly.
                </p>
              </div>

              <Link
                to="/login"
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                <span>Return to Sign in</span>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <AuthInput
                label="Work Email"
                type="email"
                required
                placeholder="john@construction.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <button
                type="submit"
                disabled={isLoading || !email}
                className={`w-full mt-2 py-2.5 px-4 text-white text-sm font-semibold rounded-lg shadow-xs transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-600/20 flex items-center justify-center gap-2 ${
                  isLoading || !email
                    ? 'bg-blue-400 cursor-not-allowed opacity-70'
                    : 'bg-blue-600 hover:bg-blue-700 cursor-pointer'
                }`}
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                ) : (
                  'Send Reset Instructions'
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </AuthLayout>
  );
};

export default ForgotPassword;