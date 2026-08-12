import React, { useState } from 'react';
import { AuthLayout } from '../../components/layouts/AuthLayout';
import { AuthInput } from '../../components/auth/AuthInput';
import { SocialLogin } from '../../components/auth/SocialLogin';

export const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [passwordError, setPasswordError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedForm = { ...formData, [name]: value };
    setFormData(updatedForm);

    // Validate password match in real-time
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Final check on form submission
    if (formData.password !== formData.confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }

    setPasswordError('');
    console.log('Register Submitted:', {
      fullName: formData.fullName,
      email: formData.email,
      password: formData.password,
    });
  };

  const isFormInvalid =
    !formData.fullName ||
    !formData.email ||
    !formData.password ||
    !formData.confirmPassword ||
    formData.password !== formData.confirmPassword;

  return (
    <AuthLayout>
      <div className="bg-white rounded-2xl border border-slate-200/80 p-8 shadow-xs sm:shadow-auth-card">
        <div className="mb-6 space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
            Create an enterprise account
          </h2>
          <p className="text-sm text-slate-500">
            Start organizing your construction projects and team workflows today.
          </p>
        </div>

        <SocialLogin />

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2.5 text-slate-400 font-medium">
              Or register with email
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <AuthInput
            label="Full Name"
            name="fullName"
            type="text"
            required
            placeholder="John Doe"
            value={formData.fullName}
            onChange={handleChange}
          />

          <AuthInput
            label="Work Email"
            name="email"
            type="email"
            required
            placeholder="john@construction.com"
            value={formData.email}
            onChange={handleChange}
          />

          <AuthInput
            label="Password"
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
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              required
              placeholder="Re-enter your password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {passwordError && (
              <p className="mt-1 text-xs text-red-500 font-medium">
                {passwordError}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isFormInvalid}
            className={`w-full mt-2 py-2.5 px-4 text-white text-sm font-semibold rounded-lg shadow-xs transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-600/20 ${
              isFormInvalid
                ? 'bg-blue-400 cursor-not-allowed opacity-70'
                : 'bg-blue-600 hover:bg-blue-700 cursor-pointer'
            }`}
          >
            Create BuniyaadEC Account
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-slate-100 text-center text-sm text-slate-600">
          Already have an account?{' '}
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

export default Register;