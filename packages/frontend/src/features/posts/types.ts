
export type Posts = {
    id: string;
    name: string;
    text: string;
}

export type PostsState = {
    posts: Posts[],
    getPosts: ()=>Promise<boolean>,
    error: string,
    isFetching: boolean,
    isError: boolean,
};