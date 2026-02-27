
import { AddPosts } from "@/features/create";
import { PostList } from "@/widgets/post-list";

export default function Index() {
  return (
        <>
        <AddPosts />
        <PostList isRemote={false}/>
        </>
        
  );
}
