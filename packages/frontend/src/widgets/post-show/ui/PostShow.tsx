import { Posts } from "@/entity/posts"

export const PostShow = ({post} : {post: Posts}) => {

    return (
        <>
            <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
            <p className="bg-[#222222] p-5">{post.content}</p> 
      </>
    )
}