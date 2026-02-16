
import Navbar from '@/widgets/navbar/ui/NavBar';
import './global.css';
import { ToastContainer } from 'react-toastify';
import { getPosts } from '@/shared/lib/server/getPosts';
import { InitPostStore } from '@/entity/posts';

export const metadata = {
  title: 'PostCreator',
  description: 'This application generates and adds to the database posts on a given topic.',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const posts = await getPosts();
  return (
    <html lang="en">
      <body className='bg-[#313131] w-screen h-screen'>
        <InitPostStore posts={posts} />
        <header className='bg-[#181818]'><Navbar /></header>
        <div className="bg-[#313131] m-auto max-w-[1440px] p-5 rounded-md">
          {children}
        </div>
        <ToastContainer position="bottom-right" autoClose={2000} theme="dark" />
      </body>
    </html>
  );
}
