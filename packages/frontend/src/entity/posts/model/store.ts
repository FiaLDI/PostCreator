import { create } from 'zustand';
import { PostCreateState, Posts } from '../types/posts.types';

export const usePostStore = create<PostCreateState>((set, get) => ({
  generated: [],
  remote: [],
  isFetching: false,
  isError: false,
  isCreating: false,

  generatePosts: async (title: string) => {

    set({ isError: false, isFetching: true, generated:[] });
      try {
        const res = await fetch("http://localhost:4000/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title }),
        });

        const result = await res.json();
        const cleaned = result.post
          .replace(/^```json\s*/, '')
          .replace(/```$/, '')
          .trim();

        const newPosts = JSON.parse(cleaned);
        set({ generated: newPosts, isFetching: false });

        return true; 
      } catch (e) {
        console.error("Ошибка запроса:", e);
        set({ isError: true, isFetching: false });
        return false; 
      }
    },

  getGeneratedPosts: () => get().generated,

  getRemotePosts: () => get().remote,

  fetchRemotePosts: async () => {
      set({ isError: false, isFetching: true });
      try {
        const res = await fetch("http://localhost:4000/post", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        const result = await res.json();
        
        set({ remote: result.allPosts, isFetching: false });

        return true; 
      } catch (e) {
        console.error("Ошибка запроса:", e);
        set({ isError: true, isFetching: false });
        return false; 
      }
  },

  addPost: async (post: Posts) => {
    if (!post.title && !post.content) return false;

    set({ isError: false, isCreating: true });

    try {
      // await fetch("http://localhost:4000/post", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(post),
      // });

      set({
        remote: [...get().remote, post],
        isError: false,
        isCreating: false,
      });

      return true;
    } catch (e) {
      console.error("Ошибка запроса:", e);
      set({ isError: true, isCreating: false });
      return false;
    }
  },
  hydrate : (posts: Posts[]) => {set({remote: posts})}

}));
