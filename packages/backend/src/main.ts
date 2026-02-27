import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import { Environment } from './env';
import { InitialRoutes } from './routes';
import { PostController } from './controllers/post.controllers';

class App {
    env: Environment;
    app: Hono;     
    routes: InitialRoutes;

    constructor() {
        this.env = new Environment({process})
        this.app = new Hono();     
        this.routes = new InitialRoutes({app: this.app, controller: new PostController});
    }

    public Start() {
        this.routes.Init();
        
        serve({ fetch: this.app.fetch, port: this.env.Port });
        
        console.log(`Server running on http://localhost:${this.env.Port} for frontend ${this.env.FrontendURL}`);  
    }
}

const Application = new App()
Application.Start();
