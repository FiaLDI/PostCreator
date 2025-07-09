import { create } from 'zustand';
import { PostsState } from './types';

export const initializeStore = (preloadedState?: Partial<PostsState>) => create<PostsState>((set) => ({
  posts: [],
  isFetching: false,
  isError: false,
  error: "",
  getPosts: async () => {
  set({ isError: false, isFetching: true });
  try {
    const res = await fetch("http://localhost:4000/post", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const result = await res.json();
    
    
    set({ posts: result.allPosts, isFetching: false });

    return true; 
  } catch (e) {
    console.error("Ошибка запроса:", e);
    set({ isError: true, isFetching: false });
    return false; 
  }
},
...preloadedState,
  
}));
