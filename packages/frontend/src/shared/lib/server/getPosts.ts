import { Posts } from "@/entity/posts";

export async function getPosts(): Promise<Posts[]> {
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