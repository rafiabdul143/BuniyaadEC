import React from "react";
import { Link } from "react-router-dom";

export interface AuthBrandProps {
  className?: string;
  logoUrl?: string;
  subtitle?: string;
}

export const AuthBrand: React.FC<AuthBrandProps> = ({
  className = "",
  logoUrl,
  subtitle = "Construction Platform",
}) => {
  return (
    <Link 
      to="/" 
      aria-label="BuniyaadEC Home"
      className={`inline-flex items-center gap-3 transition-opacity hover:opacity-90 ${className}`}
    >
      {logoUrl ? (
        <img
          src={logoUrl}
          alt="BuniyaadEC Emblem"
          className="h-8 w-auto object-contain select-none"
          draggable={false}
        />
      ) : (
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-primary text-white font-bold text-sm tracking-wider">
          BEC
        </div>
      )}
      <div className="flex flex-col text-left">
        <span className="text-lg font-bold tracking-tight text-foreground">
          Buniyaad<span className="text-brand-primary">EC</span>
        </span>
        <span className="text-[10px] font-semibold tracking-wider text-muted uppercase">
          {subtitle}
        </span>
      </div>
    </Link>
  );
};