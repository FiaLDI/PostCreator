
export class Environment {

    Port: number = 4000;
    OpenrouterApiKey: string | undefined;
    DatabaseURL: string | undefined;
    FrontendURL: string | undefined;

    constructor({
        process
    }: {
        process: NodeJS.Process
    }) {
        const env = process.env;

        this.Port = Number(env.PORT);
        this.OpenrouterApiKey = env.OPENROUTER_API_KEY;
        this.DatabaseURL = env.DATABASE_URL;
        this.FrontendURL = env.FRONTEND_URL;

        console.log(`All required = ${this.allRequired()}`)
    }

    public getPost = () => this.Port;
    public getOpenrouterApiKey = () => this.OpenrouterApiKey;
    public getDatabaseURL = () => this.DatabaseURL;
    public getFrontendURL = () => this.FrontendURL;

    public getEnv() {
        return { 
            Port: this.getPost(), 
            OpenrouterApiKey: this.getOpenrouterApiKey(), 
            DatabaseURL: this.getDatabaseURL(),
            FrontendURL: this.getFrontendURL(),
        }
    }

    public allRequired() {
        return Boolean(this.getPost() && this.getOpenrouterApiKey() && this.getDatabaseURL() && this.getFrontendURL());
    }

}