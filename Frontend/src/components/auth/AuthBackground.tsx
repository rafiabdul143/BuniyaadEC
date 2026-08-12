import React from "react";

export const AuthBackground: React.FC = () => {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden bg-background">
      {/* Structural CAD Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `linear-gradient(to right, var(--color-brand-primary) 1px, transparent 1px), linear-gradient(to bottom, var(--color-brand-primary) 1px, transparent 1px)`,
          backgroundSize: "32px 32px"
        }}
      />
      {/* Ambient Lighting Layers */}
      <div className="absolute top-0 left-0 h-[400px] w-[400px] rounded-full bg-brand-primary/5 blur-[100px]" />
      <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-brand-secondary/5 blur-[100px]" />
    </div>
  );
};
export default AuthBackground;