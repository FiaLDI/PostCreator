"use client";

import { Posts, usePostStore } from "@/entity/posts";
import { toast } from "react-toastify";

export const useUpdatePosts = ({inputValue}: {inputValue?: string}) => {
    const {generatePosts, addPost, isFetching, isError} = usePostStore();

    const handleGenerate = async () => {
        if (!inputValue) return;
        const success = await generatePosts(inputValue);
        console.log(success)
        
        if (success) {
            toast.success("Посты успешно загружены");
        } else {
            toast.error("Ошибка при загрузке постов");
        }
    };

    const handleAdd = async (post: Posts) => {
        const success = await addPost(post);
        
        if (success) {
            toast.success("Пост успешно создан");
        } else {
            toast.error("Ошибка при создании поста");
        }
    };
    return {
        handleGenerate,
        handleAdd,
        isFetching,
        isError
    }
}