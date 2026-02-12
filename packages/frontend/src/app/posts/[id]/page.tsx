import { notFound } from "next/navigation";

type Props = {
  params: { id: string };
};

export default async function PostPage({ params }: Props) {
  const { id } = await params;

  const res = await fetch(`http://localhost:4000/post/${id}`);

  console.log('Response status:', res.status);

  if (!res.ok) return notFound();

  const post = await res.json();

  console.log('Post data:', post);

  return (
    <main className="p-6 max-w-2xl mx-auto text-white">
      <h1 className="text-3xl font-bold mb-4">{post.name}</h1>
      <p className="bg-[#222222] p-5">{post.text}</p>
    </main>
  );
}
