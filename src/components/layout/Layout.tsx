import { ReactNode } from "react";
import Header from "./Header";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-bg-primary text-schema-on-surface">
      <Header />
      <main className="pt-16">{children}</main>
    </div>
  );
}
