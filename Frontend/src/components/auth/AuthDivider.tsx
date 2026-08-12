import React from "react";

export interface AuthDividerProps {
  label?: string;
}

export const AuthDivider: React.FC<AuthDividerProps> = ({ label = "Or continue with" }) => {
  return (
    <div className="relative flex items-center justify-center my-4" role="separator">
      <div className="w-full border-t border-border" />
      <span className="absolute bg-background px-2.5 text-[10px] font-semibold tracking-wider text-muted uppercase">
        {label}
      </span>
    </div>
  );
};