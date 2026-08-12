import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // ✅ Correct package
import { AuthLayout } from '../../components/layouts/AuthLayout';
import { AuthInput } from '../../components/auth/AuthInput';
import { SocialLogin } from '../../components/auth/SocialLogin';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => setIsSubmitting(false), 1200);
  };

  return (
    <AuthLayout>
      <div className="bg-white rounded-2xl border border-slate-200/80 p-8 shadow-xs sm:shadow-auth-card">
        
        {/* Back Button */}
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 mb-6 text-xs sm:text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors cursor-pointer group"
        >
          <svg
            className="w-4 h-4 transition-transform group-hover:-translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back
        </button>

        {/* Form Header */}
        <div className="mb-6 space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
            Welcome back
          </h2>
          <p className="text-sm text-slate-500">
            Enter your workplace credentials to access your workspaces.
          </p>
        </div>

      

        {/* Email Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <AuthInput
            label="Work Email"
            type="email"
            required
            placeholder="name@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <AuthInput
            label="Password"
            type="password"
            required
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-600/20"
              />
              <span className="text-slate-600 text-xs sm:text-sm">Remember this device</span>
            </label>

            <Link
              to="/forgotpassword"
              className="text-xs sm:text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-2 py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg shadow-xs transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-600/20 cursor-pointer disabled:opacity-50"
          >
            {isSubmitting ? 'Signing in...' : 'Sign in to Account'}
          </button>
        </form>

        
        {/* Semantic Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2.5 text-slate-400 font-medium">Or continue with</span>
          </div>
        </div>

  {/* SSO Integration */}
        <SocialLogin
          onGoogleSelect={() => console.log('Google Auth Triggered')}
          onMicrosoftSelect={() => console.log('Microsoft Auth Triggered')}
        />
        {/* Secondary Navigation */}
        <div className="mt-6 pt-4 border-t border-slate-100 text-center text-sm text-slate-600">
          Don't have an account?{' '}
          <Link to="/register" className="font-semibold text-blue-600 hover:text-blue-700 transition-colors">
            Create an account
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Login;