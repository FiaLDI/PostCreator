
export type PreCreatePosts = {
    title: string;
    content: string;
}

export type PostCreateState = {
    posts: PreCreatePosts[],
    setPosts: (title: string)=> Promise<boolean>;
    getPosts: ()=>PreCreatePosts[];
    create: (post: PreCreatePosts) => Promise<boolean>;
    isFetching: boolean,
    isError: boolean,
    isCreating: boolean,
};