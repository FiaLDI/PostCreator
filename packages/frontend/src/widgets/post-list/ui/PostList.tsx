'use client'

import {motion} from "motion/react";
import { PostItem, usePostStore } from "@/entity/posts";
import { useUpdatePosts } from "@/features/create/model/useUpdatePosts";

export const PostList = ({isRemote}: {isRemote: boolean}) => {

    const {
      getGeneratedPosts,
      getRemotePosts,
    } = usePostStore();

    const {
      handleAdd
    } = useUpdatePosts({});

    console.log(getRemotePosts())

    const List = isRemote ? getRemotePosts() : getGeneratedPosts();

    return (
        <motion.ul 
          initial={{ opacity: "0%" }} 
          animate={{ opacity: "100%" }} 
          className="grid 2xl:grid-cols-3 xl:grid-cols-2 sm:grid-cols-1 gap-5 "
        >
            {List && List.map((val, idx) => (
                <PostItem 
                  key={`post-idx-${idx}`}
                  title={val.title} 
                  content={val.content} 
                  select={()=> {
                    if(!isRemote) {
                      handleAdd(val);
                    }
                  }} 
                />
            ))}
        </motion.ul>
    );
}
