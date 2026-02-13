"use client";

import React from "react";

const Input = React.forwardRef(
  ({ className = "", type = "text", ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      className={`flex h-10 w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    />
  ),
);

Input.displayName = "Input";

export { Input };
