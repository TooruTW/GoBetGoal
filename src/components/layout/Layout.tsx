import { ReactNode, useState } from "react";
import Header from "./Header";
import NotificationSection from "./NotificationSection";

interface LayoutProps {
  children: ReactNode;
  className?: string;
}

export default function Layout({ children, className }: LayoutProps) {
  const [isShowNotification, setIsShowNotification] = useState(false);
  return (
    <div
      className={`min-h-screen flex flex-col bg-background text-schema-on-surface ${className}`}
    >
      <Header
        setIsShowNotification={() => setIsShowNotification(!isShowNotification)}
      />
      <NotificationSection
        isShow={isShowNotification}
        closeNotification={() => setIsShowNotification(false)}
      />
      <main className=" h-full pt-16 flex items-center justify-center min-h-screen">{children}</main>
    </div>
  );
}
