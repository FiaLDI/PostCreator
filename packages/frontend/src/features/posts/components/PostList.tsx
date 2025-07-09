'use client'

import { usePostStoree } from "../context/StoreContext";
import Link from "next/link";
import {motion} from "motion/react";

export default function PostList( ) {

    const useStore = usePostStoree();
    const posts = useStore(s => s.posts);
    
    
  return (
    <motion.ul initial={{ opacity: "0%" }} animate={{ opacity: "100%" }} className="grid 2xl:grid-cols-3 xl:grid-cols-2 sm:grid-cols-1 gap-5 ">
        {posts && posts.map((val, idx) => (
            
            <li className="p-4 text-white  bg-[#131313] flex flex-col gap-5 justify-between rounded-md" key={`create-post-idx-${idx}`}>
                <div className="flex flex-col gap-5">
                  <h2 className="bg-[#1daa29] p-1 overflow-hidden rounded-md text-center text-wrap break-words  h-fit" ><Link className="text-white justify-center flex gap-1 text-center" href={`/posts/${val.id}`}>{val.name}</Link></h2>
                  <p className="overflow-hidden">{val.text}</p>
                </div>
            </li>
        ))}
    </motion.ul>
  );
}
