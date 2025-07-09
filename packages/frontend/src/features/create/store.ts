import { create } from 'zustand';
import { PostCreateState, PreCreatePosts } from './types';

export const usePostStore = create<PostCreateState>((set, get) => ({
  posts: [],
  isFetching: false,
  isError: false,
  isCreating: false,
  setPosts: async (title: string) => {

  set({ isError: false, isFetching: true, posts:[] });
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
    set({ posts: newPosts, isFetching: false });

    return true; 
  } catch (e) {
    console.error("Ошибка запроса:", e);
    set({ isError: true, isFetching: false });
    return false; 
  }
},

  getPosts: () => get().posts,

  create: async (post: PreCreatePosts) => {
  if (!post.title && !post.content) return false;



  set({ isError: false, isCreating: true });

  try {
    await fetch("http://localhost:4000/post", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(post),
    });

    // Получаем текущие посты
    const currentPosts = get().posts;

    // Удаляем тот, который только что создали
    const updatedPosts = currentPosts.filter(
      p => !(p.title === post.title && p.content === post.content)
    );

    // Обновляем состояние
    set({
      posts: updatedPosts,
      isError: false,
      isCreating: false,
    });

    return true;
  } catch (e) {
    console.error("Ошибка запроса:", e);
    set({ isError: true, isCreating: false });
    return false;
  }
}

}));
