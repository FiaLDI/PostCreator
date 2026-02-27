import { Context } from "hono";
import { PostService } from "../services/post.service";
import { db, posts } from "../lib/db";

export class PostController {
    Service: PostService;

    constructor() {
        this.Service = new PostService(db, posts);
    }

    async getAllPosts(c: Context) {
        return c.json(
            this.Service.getAllPosts()
        );
    }

    async getPost(c: Context) {
        try {
            const id = c.req.param('id');

            if (isNaN(Number(id))) {
                return c.json({ error: 'Invalid post ID' }, 400);
            }
            const result = await this.Service.getPost(Number(id))
            
            const post = result[0];

            if (!post) {
                return c.json({ error: 'Post not found' }, 404);
            }

            return c.json(post);
        } catch (err) {
            if (err instanceof Error) {
                return c.json({ error: err.message }, 400);
            } else {
                return c.json({ error: 'Unknown error occurred' }, 400);
            }
        }
    }

    async addPost(c: Context) {
        try {   
            const { title, content } = await c.req.json();

            await this.Service.addPost({title, content});
            return c.json({ message: 'success added' });
        } catch (err) {
            if (err instanceof Error) {
                return c.json({ error: err.message }, 400);
            } else {
                return c.json({ error: 'Unknown error occurred' }, 400);
            }
        }
    }

    async generatePost(c: Context) {
        try {   
            const { title } = await c.req.json();

            const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    model: "upstage/solar-pro-3:free",
                    messages: [
                        { role: "system", content: `Ты блогер, пиши интересно и структурировано. Пиши коротко и по делу.  Формат ответа строго в JSON: [{"title": "...", "content": "..."}, ..., {"title": "...", "content": "..."}] без комментариев и переносов.` },
                        { role: "user", content: `Напиши 5 блог-постов на тему: "${title}"` }
                    ]
                }),
            });

            const data = await response.json() as {
                choices?: { message?: { content?: string } }[];
            };
            
            return c.json({ post: data.choices?.[0]?.message?.content || "Ошибка генерации текста." });
        } catch (err) {
            if (err instanceof Error) {
                return c.json({ error: err.message }, 400);
            } else {
                return c.json({ error: 'Unknown error occurred' }, 400);
            }
        }
    }
}
