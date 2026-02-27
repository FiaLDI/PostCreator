import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import { db } from './config/db';
import { posts } from './config/schema';
import { cors } from 'hono/cors';
import { eq } from 'drizzle-orm';

console.log(process.env.OPENROUTER_API_KEY)

const app = new Hono();

app.use('*', cors({
    origin: 'http://localhost:4200',
    allowMethods: ['GET', 'POST', 'OPTIONS'],
    allowHeaders: ['Content-Type'],
}));

app.get('/post', async (c) => {
  try {
    const allPosts = await db.select().from(posts);
    return c.json(allPosts);
  } catch (err) {
    if (err instanceof Error) {
        return c.json({ error: err.message }, 400);
    } else {
        return c.json({ error: 'Unknown error occurred' }, 400);
    }
    
  }
});

app.get('/post/:id', async (c) => {
  try {
    const id = c.req.param('id');

    if (isNaN(Number(id))) {
        return c.json({ error: 'Invalid post ID' }, 400);
    }
    const result = await db
        .select()
        .from(posts)
        .where(eq(posts.id, Number(id)))
    
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
});

app.post('/post', async(c) => {
    try {   
        const { title, content } = await c.req.json();
        console.log("title:", title, "content:", content);
        await db.insert(posts).values({  title: title, content: content });
        return c.json({ message: 'success added' });
    } catch (err) {
        if (err instanceof Error) {
            return c.json({ error: err.message }, 400);
        } else {
            return c.json({ error: 'Unknown error occurred' }, 400);
        }
    }
})


app.post('/generate', async(c) => {
    try {   
        const { title } = await c.req.json();
        console.log('Генерация поста по теме:', title);

        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "upstage/solar-pro-3:free",  // здесь модель DeepSeek-R1
                messages: [
                    { role: "system", content: `Ты блогер, пиши интересно и структурировано. Пиши коротко и по делу.  Формат ответа строго в JSON: [{"title": "...", "content": "..."}, ..., {"title": "...", "content": "..."}] без комментариев и переносов.` },
                    { role: "user", content: `Напиши 5 блог-постов на тему: "${title}"` }
                ]
            }),
        });

        const data = await response.json() as {
            choices?: { message?: { content?: string } }[];
        };

        console.log(JSON.stringify(data, null, 2));
        console.log(data.choices?.[0]?.message?.content)
        return c.json({ post: data.choices?.[0]?.message?.content || "Ошибка генерации текста." });
    } catch (err) {
        if (err instanceof Error) {
            return c.json({ error: err.message }, 400);
        } else {
            return c.json({ error: 'Unknown error occurred' }, 400);
        }
    }
});

const port = 4000;
serve({ fetch: app.fetch, port });

console.log(`Server running on http://localhost:${port}`);
