import React from "react";
import { AuthHeader } from "./AuthHeader";

export interface AuthCardProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

export const AuthCard: React.FC<AuthCardProps> = ({ title, subtitle, children }) => {
  return (
    <div className="animate-fade-in w-full max-w-[420px] rounded-2xl border border-border bg-background p-6 sm:p-8 shadow-sm">
      <AuthHeader title={title} subtitle={subtitle} />
      {children}
    </div>
  );
};