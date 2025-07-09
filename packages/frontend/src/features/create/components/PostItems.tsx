'use client'

import { PreCreatePosts } from "../types";

export default function PostItem({posts, postcreate} :{posts: PreCreatePosts[], postcreate: (post: PreCreatePosts) => void}  ) {


    
  return (
    <ul className={
      `grid 
        ${posts.length === 5 && '2xl:grid-cols-5 '}
        ${posts.length === 4 && '2xl:grid-cols-4 '}
        ${posts.length === 3 && '2xl:grid-cols-3 '}
        ${posts.length === 2 && '2xl:grid-cols-2 '}
        ${posts.length === 1 && '2xl:grid-cols-1 '}
        xl:grid-cols-1 sm:grid-cols-1 gap-5 justify-items-center w-full
        rounded-md`
    
    }>
        {posts && posts.map((val, idx) => (
            
            <li className="p-4 text-white  bg-[#131313] flex flex-col gap-5 justify-between rounded-md" key={`create-post-idx-${idx}`}>
                <div className="flex flex-col gap-5">
                  <h2 className="bg-[#1daa29] p-1 overflow-hidden rounded-md h-14 text-center text-wrap break-words xl:h-fit" >{val.title}</h2>
                  <p className="overflow-hidden">{val.content}</p>
                </div>
                <button className="p-2 pl-5 pr-5 border-b" onClick={()=> {postcreate({title: val.title, content: val.content})}}>Select</button>
            </li>
        ))}
    </ul>
  );
}
