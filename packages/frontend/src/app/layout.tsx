import Navbar from '@/components/layout/NavBar';
import './global.css';
import { ToastContainer } from 'react-toastify';
import FooterNav from '@/components/layout/Footer';

export const metadata = {
  title: 'PostCreator',
  description: 'This application generates and adds to the database posts on a given topic.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className='bg-[#313131] w-screen h-screen'>
        <header className='bg-[#181818]'><Navbar /></header>
        <div className="bg-[#313131] m-auto max-w-[1440px] p-5 rounded-md  min-w-screen min-h-screen">
          {children}
        </div>
        <ToastContainer position="bottom-right" autoClose={2000} theme="dark" />
        <footer className='bg-[#181818]'><FooterNav /></footer>
      </body>
    </html>
  );
}
