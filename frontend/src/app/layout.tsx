import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import "./globals.css";
import "bootstrap/dist/css/bootstrap.css";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import BootstrapClient from '@/components/BootstrapClient.js';
import { SessionProvider } from 'next-auth/react';
import { Providers } from './providers';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const serverSession = await getServerSession(authOptions);
  return (
    <Providers>
      <html lang="en">
        <body>
          <div className='container'>
            <Navbar serverSession={serverSession} />
            <div className='row justify-content-md-center mt-3'>
              <div className='col-md-6 col-12'>
                <main>{children}</main>
              </div>
            </div>
            <Footer />
          </div>
          <BootstrapClient />
        </body>
      </html>
    </Providers>
  );
}
