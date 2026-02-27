import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { eq } from "drizzle-orm";
import { posts } from "../lib/db";

export class PostService {
    constructor(
        private drizzle: NodePgDatabase,
        private postsTable: typeof posts
    ) {}

    async addPost(postData: { title: string; content: string }) {
        return this.drizzle
            .insert(this.postsTable)
            .values({
                title: postData.title,
                content: postData.content,
            })
            .returning();
    }

    async removePost(id: number) {
        return this.drizzle
            .delete(this.postsTable)
            .where(eq(this.postsTable.id, id));
    }

    async getPost(id: number) {
        return this.drizzle
            .select()
            .from(this.postsTable)
            .where(eq(this.postsTable.id, id));
    }

    async updatePost(id: number, data: { title: string; content: string }) {
        return this.drizzle
            .update(this.postsTable)
            .set({
                title: data.title,
                content: data.content,
            })
            .where(eq(this.postsTable.id, id))
            .returning();
    }

    async getAllPosts() {
        return this.drizzle
            .select()
            .from(this.postsTable)
            .limit(10);
    }
}