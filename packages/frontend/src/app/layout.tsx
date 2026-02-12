
import Navbar from '@/widgets/navbar/ui/NavBar';
import './global.css';
import { ToastContainer } from 'react-toastify';

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
        <div className="bg-[#313131] m-auto max-w-[1440px] p-5 rounded-md">
          {children}
        </div>
        <ToastContainer position="bottom-right" autoClose={2000} theme="dark" />
      </body>
    </html>
  );
}
