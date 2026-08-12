import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { AuthLayout } from '../../components/layouts/AuthLayout';
import { AuthInput } from '../../components/auth/AuthInput';

export const ResetPassword: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedForm = { ...formData, [name]: value };
    setFormData(updatedForm);

    if (name === 'password' || name === 'confirmPassword') {
      if (
        updatedForm.confirmPassword &&
        updatedForm.password !== updatedForm.confirmPassword
      ) {
        setPasswordError('Passwords do not match');
      } else {
        setPasswordError('');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }

    setPasswordError('');
    setIsLoading(true);

    // Simulate API Call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    navigate('/login');
  };

  const isFormInvalid =
    !formData.password ||
    !formData.confirmPassword ||
    formData.password !== formData.confirmPassword;

  return (
    <AuthLayout>
      <div className="bg-white rounded-2xl border border-slate-200/80 p-8 shadow-xs sm:shadow-auth-card">
        <div className="mb-6 space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
            Set new password
          </h2>
          <p className="text-sm text-slate-500">
            Set a secure password for your workspace account.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <AuthInput
            label="New Password"
            name="password"
            type="password"
            required
            placeholder="At least 8 characters"
            helperText="Must contain uppercase, lowercase, and numbers."
            value={formData.password}
            onChange={handleChange}
          />

          <div>
            <AuthInput
              label="Confirm New Password"
              name="confirmPassword"
              type="password"
              required
              placeholder="Re-enter new password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {passwordError && (
              <p className="mt-1 text-xs font-medium text-red-500">
                {passwordError}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading || isFormInvalid}
            className={`w-full mt-2 py-2.5 px-4 text-white text-sm font-semibold rounded-lg shadow-xs transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-600/20 flex items-center justify-center gap-2 ${
              isLoading || isFormInvalid
                ? 'bg-blue-400 cursor-not-allowed opacity-70'
                : 'bg-blue-600 hover:bg-blue-700 cursor-pointer'
            }`}
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            ) : (
              'Update Password'
            )}
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-slate-100 text-center text-sm text-slate-600">
          Remember your password?{' '}
          <a
            href="/login"
            className="font-semibold text-blue-600 hover:text-blue-700 transition-colors"
          >
            Sign in
          </a>
        </div>
      </div>
    </AuthLayout>
  );
};

export default ResetPassword;