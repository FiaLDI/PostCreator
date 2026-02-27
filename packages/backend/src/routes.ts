import { Hono } from "hono";
import { PostController } from "./controllers/post.controllers";
import { cors } from "hono/cors";

export class InitialRoutes {
    app: Hono
    controller: PostController
    FrontendURL: string = 'http://localhost:4200'

    constructor({app, controller}: {app: Hono, controller: PostController}) {
        this.app = app;
        this.controller = controller;
    }

    async Init() {
        this.app.use('*', cors({
            origin: this.FrontendURL,
            allowMethods: ['GET', 'POST', 'OPTIONS'],
            allowHeaders: ['Content-Type'],
        }));

        this.app.get('/post', async (c) => this.controller.getAllPosts(c));
        this.app.get('/post/:id', async (c) => this.controller.getPost(c));
        this.app.post('/post', async(c) => this.controller.addPost(c))
        this.app.post('/generate', async(c) => this.controller.generatePost(c));
    }
}