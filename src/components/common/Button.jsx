import React from "react";

export const Button = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  asLink = false,
  href = "",
  type = "button",
  ...props
}) => {
  const sizes = {
    sm: { height: 38, padding: "0 16px", fontSize: "0.875rem" },
    md: { height: 46, padding: "0 22px", fontSize: "0.9375rem" },
    lg: { height: 52, padding: "0 28px", fontSize: "1rem" },
  };
  const variants = {
    primary: { background: "var(--petra-terracotta)", color: "#fff", border: "1px solid var(--petra-terracotta)", boxShadow: "0 12px 26px -14px rgba(188,70,57,.55)", fontWeight: 700 },
    amber: { background: "var(--petra-terracotta)", color: "#fff", border: "1px solid var(--petra-terracotta)", boxShadow: "0 14px 28px -14px rgba(188,70,57,.55)", fontWeight: 700 },
    secondary: { background: "var(--petra-burgundy)", color: "#fff", border: "1px solid var(--petra-burgundy)" },
    outline: { background: "rgba(255,255,255,.08)", color: "#fff", border: "1.5px solid rgba(255,255,255,.38)" },
    ghost: { background: "transparent", color: "var(--petra-burgundy)", border: "1px solid rgba(92,32,24,.18)" },
  };

  const style = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
    borderRadius: 999,
    fontWeight: 600,
    fontFamily: "var(--font-sans)",
    cursor: "pointer",
    transition: "transform var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out), background var(--dur-fast) var(--ease-out), border-color var(--dur-fast) var(--ease-out)",
    textDecoration: "none",
    whiteSpace: "nowrap",
    ...sizes[size],
    ...variants[variant],
  };

  const Comp = asLink ? "a" : "button";
  const extra = asLink ? { href } : { type };
  return (
    <Comp className={`focus-outline ${className}`.trim()} style={style} {...extra} {...props}>
      {children}
    </Comp>
  );
};

Button.variants = ["primary", "amber", "secondary", "outline", "ghost"];
Button.sizes = ["sm", "md", "lg"];
export default Button;
