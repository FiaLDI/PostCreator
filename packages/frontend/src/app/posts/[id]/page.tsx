import { PostShow } from "@/widgets/post-show";
import { notFound } from "next/navigation";

type Props = {
  params: { id: string };
};

export default async function PostPage({ params }: Props) {
  const { id } = await params;

  const res = await fetch(`http://localhost:4000/post/${id}`);
  const post = await res.json();

  if (!res.ok) return notFound();

  return (
    <div className="p-6 max-w-2xl mx-auto text-white">
      <PostShow post={post} />
    </div>
  );
}
