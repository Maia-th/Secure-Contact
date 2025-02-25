"use client";

import Sidebar from "@/components/SideBar";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-dvh w-full">
      <Sidebar />
      <div className="flex flex-col items-center justify-center m-auto">
        {children}
      </div>
    </div>
  );
}
