import Link from "next/link";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "dark" | "white" | "outline-white";
  className?: string;
};

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
}: Props) {
  const map = {
    primary: "btn btn-primary",
    dark: "btn btn-dark",
    white: "btn btn-white",
    "outline-white": "btn btn-outline-white",
  };

  return (
    <Link href={href} className={`${map[variant]} ${className}`}>
      {children}
    </Link>
  );
}
