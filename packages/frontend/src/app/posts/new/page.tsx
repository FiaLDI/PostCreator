
import AddPosts from "@/features/create/components/AddPosts";
import { StoreProvider } from "@/features/create/context/StoreContext";

export default function Index() {
  return (
    <StoreProvider>
        <>
        <AddPosts />
        
        </>
        
    </StoreProvider>
  );
}
