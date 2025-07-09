'use client'
import Link from "next/link";
import { House, Plus } from "lucide-react";

export default function Navbar() {

  return (
    <nav className=" p-4 flex justify-between items-center text-white">
      <h1 className="text-2xl"><Link className="text-white  flex gap-1" href={"/"}>Post.ai</Link></h1>
      <ul className="flex gap-5">
        <li><Link className="text-white  hover:underline flex gap-1" href={"/"}>Home<House size={24} /></Link></li>
        <li><Link href="/posts/new" className="text-white hover:underline flex gap-1">Generate post<Plus size={24} /></Link></li>
      </ul>
    </nav>
  )
}
