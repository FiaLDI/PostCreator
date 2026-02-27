
import { PostList } from "@/widgets/post-list";

export default async function Index() {
  
  return (
      <>
          <PostList isRemote={true}/>
      </>
  );
}
