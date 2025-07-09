import PostList from "@/features/posts/components/PostList";
import { StoreProvider } from "@/features/posts/context/StoreContext";
import { Posts } from "@/features/posts/types";

async function getPosts(): Promise<Posts[]> {
  try {
  const res = await fetch("http://localhost:4000/post", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
  });

      if (!res.ok) return []; 

      return res.json();
  } catch(err) {
      console.error(err);
      return[]
  }
}

export default async function Index() {
  const posts = await getPosts();
  
  return (
    <StoreProvider initialState={posts}>
      <div>
          <PostList />
      </div>
    </StoreProvider>
  );
}
