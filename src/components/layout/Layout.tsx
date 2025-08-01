import { ReactNode } from "react";
import Header from "./Header";

interface LayoutProps {
  children: ReactNode;
  className?: string;
}

export default function Layout({ children, className }: LayoutProps) {

  return (
    <div className={`min-h-screen bg-background text-schema-on-surface ${className}`}>
      <Header />
      <main className="pt-14 min-h-screen">{children}</main>
    </div>
  );
}
