import React from "react";

export interface AuthHeaderProps {
  title: string;
  subtitle: string;
}

export const AuthHeader: React.FC<AuthHeaderProps> = ({ title, subtitle }) => {
  return (
    <header className="mb-6 space-y-1 text-left">
      <h2 className="text-2xl font-bold tracking-tight text-foreground">
        {title}
      </h2>
      <p className="text-xs font-medium text-muted">
        {subtitle}
      </p>
    </header>
  );
};