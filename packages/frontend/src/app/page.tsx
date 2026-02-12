import PostList from "@/features/posts/components/PostList";
import { StoreProvider } from "@/features/posts/context/StoreContext";
import { getPosts } from "@/shared/lib/server/getPosts";

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
