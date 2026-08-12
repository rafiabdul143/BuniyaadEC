import React, { useState } from 'react';
import { MailCheck, Loader2 } from 'lucide-react';
import { AuthLayout } from '../../components/layouts/AuthLayout';

export const VerifyEmail: React.FC = () => {
  const [isResending, setIsResending] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);

  const handleResend = async () => {
    setIsResending(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsResending(false);
    setResendSuccess(true);
  };

  return (
    <AuthLayout>
      <div className="bg-white rounded-2xl border border-slate-200/80 p-8 shadow-xs sm:shadow-auth-card">
        <div className="mb-6 space-y-1 text-left">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
            Verify work email
          </h2>
          <p className="text-sm text-slate-500">
            A verification link has been sent to your inbox.
          </p>
        </div>

        <div className="space-y-5 text-center py-2">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
            <MailCheck className="h-7 w-7" aria-hidden="true" />
          </div>

          <p className="text-sm leading-relaxed text-slate-600">
            Please click the verification link in the email sent to your address to activate your BuniyaadEC workspace account.
          </p>

          {resendSuccess && (
            <p role="status" className="text-xs font-semibold text-emerald-600">
              Verification link re-sent successfully.
            </p>
          )}

          <div className="space-y-3 pt-2">
            <button
              onClick={handleResend}
              disabled={isResending}
              className="w-full py-2.5 px-4 border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 text-sm font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-600/20 disabled:opacity-70 cursor-pointer"
            >
              {isResending ? (
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              ) : (
                'Resend Verification Link'
              )}
            </button>

            <div>
              <a
                href="/login"
                className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
              >
                Return to Sign in
              </a>
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default VerifyEmail;