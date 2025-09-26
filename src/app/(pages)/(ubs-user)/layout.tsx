import type { Metadata } from "next";
import '@/app/globals.css';
import Sidebar from './../../../components/side-bar';
import HeaderPrivate from './../../../components/header-private';
import OperationButton from "@/components/buttons/operation-button";

export const metadata: Metadata = {
  title: "Timon - UBS",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <main
        className='bg-light-background flex w-screen'
      >
        <Sidebar />
        <section className="w-screen">
          <HeaderPrivate />
            {children}
          <OperationButton />
        </section>
      </main>
  );
}