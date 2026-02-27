
interface PostItemProps {
    title: string; 
    content: string; 
    select: () => void
}

export const PostItem = ({
    title, 
    content, 
    select
}: PostItemProps) => (
    <li className="p-4 text-white  bg-[#131313] flex flex-col gap-5 justify-between rounded-md">
        <div className="flex flex-col gap-5">
            <h2 className="bg-[#1daa29] p-1 overflow-hidden rounded-md h-14 text-center text-wrap break-words xl:h-fit" >{title}</h2>
            <p className="overflow-hidden">{content}</p>
        </div>
        <button className="p-2 pl-5 pr-5 border-b" onClick={select}>Select</button>
    </li>
)