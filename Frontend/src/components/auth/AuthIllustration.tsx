import React from "react";
import { FileText, Layers, CheckSquare, HardHat, FileCheck } from "lucide-react";

export const AuthIllustration: React.FC = () => {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center p-8 lg:p-12">
      {/* CAD Axis Guides */}
      <div className="absolute inset-x-8 top-12 flex justify-between text-[10px] font-mono text-muted/40 uppercase">
        <span>CAD Ref: SEC-A4</span>
        <span>Scale 1:100</span>
      </div>

      <div className="relative my-auto flex w-full max-w-md flex-col items-center">
        
        {/* Core Vector Engineering Diagram */}
        <div className="relative w-full aspect-square max-w-[340px] flex items-center justify-center">
          
          {/* Blueprint Canvas Box */}
          <div className="relative z-10 w-full h-full rounded-2xl border border-border bg-surface p-6 shadow-sm flex flex-col justify-between">
            
            {/* Header Document Controls */}
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div className="flex items-center gap-2">
                <div className="h-2.5 w-2.5 rounded-sm bg-brand-primary" />
                <span className="text-xs font-bold text-foreground tracking-tight">
                  Site Execution & Approvals
                </span>
              </div>
              <span className="text-[10px] font-medium text-muted bg-background px-2 py-0.5 rounded border border-border">
                Drawing Set #04
              </span>
            </div>

            {/* Structural Blueprint Grid Drawing */}
            <div className="my-4 grid grid-cols-3 gap-2.5">
              <div className="h-24 bg-background rounded-lg border border-border p-2 flex flex-col justify-between">
                <Layers className="h-4 w-4 text-brand-primary" />
                <div className="space-y-1">
                  <div className="h-1 w-full bg-border rounded-full" />
                  <div className="h-1 w-2/3 bg-border rounded-full" />
                </div>
              </div>
              <div className="h-28 bg-brand-primary/5 rounded-lg border border-brand-primary/20 p-2 flex flex-col justify-between -translate-y-2">
                <FileText className="h-4 w-4 text-brand-primary" />
                <div className="space-y-1">
                  <div className="h-1 w-full bg-brand-primary/30 rounded-full" />
                  <div className="h-1 w-full bg-brand-primary/30 rounded-full" />
                  <div className="h-1 w-1/2 bg-brand-primary/30 rounded-full" />
                </div>
              </div>
              <div className="h-24 bg-background rounded-lg border border-border p-2 flex flex-col justify-between">
                <CheckSquare className="h-4 w-4 text-brand-primary" />
                <div className="space-y-1">
                  <div className="h-1 w-full bg-border rounded-full" />
                  <div className="h-1 w-3/4 bg-border rounded-full" />
                </div>
              </div>
            </div>

            {/* Status Footer */}
            <div className="flex items-center justify-between pt-2 border-t border-border text-[11px] font-semibold text-muted">
              <span>Workflow Verification</span>
              <span className="text-success flex items-center gap-1">
                <FileCheck className="h-3.5 w-3.5" /> Compliant
              </span>
            </div>
          </div>

          {/* Floating Reusable Module Cards */}
          <div className="animate-subtle-float absolute -top-3 -left-4 z-20 flex items-center gap-2.5 rounded-xl border border-border bg-background p-3 shadow-md">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-primary/10 text-brand-primary">
              <FileText className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-foreground">Drawings & Blueprints</p>
              <p className="text-[10px] font-medium text-muted">Document Control</p>
            </div>
          </div>

          <div className="animate-subtle-float absolute -bottom-3 -right-4 z-20 flex items-center gap-2.5 rounded-xl border border-border bg-background p-3 shadow-md">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-accent/10 text-brand-accent">
              <HardHat className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-foreground">Contractor Operations</p>
              <p className="text-[10px] font-medium text-muted">Vendor Network</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};