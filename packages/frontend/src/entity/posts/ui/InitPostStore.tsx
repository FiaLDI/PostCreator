"use client";

import { usePostStore } from "../model/store";
import { Posts } from "../types/posts.types";

export const InitPostStore = ({posts}: {posts:Posts[]}) => {
    usePostStore.getState().hydrate(posts);

    return null;
}