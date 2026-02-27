
export type Posts = {
    id?: string;
    title: string;
    content: string;
}

export type PostCreateState = {
    generated: Posts[],
    remote: Posts[],
    generatePosts: (title: string)=> Promise<boolean>;
    getGeneratedPosts: () => Posts[];
    getRemotePosts: () => Posts[];
    addPost: (post: Posts) => Promise<boolean>;
    isFetching: boolean,
    isError: boolean,
    isCreating: boolean,
    hydrate: (posts: Posts[]) => void,
};
