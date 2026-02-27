'use client'

import { useState } from "react";
import { Loader2Icon, MailX } from "lucide-react";
import { motion } from "motion/react";
import { useUpdatePosts } from "../model/useUpdatePosts";

export const AddPosts = () => {
    const [inputValue, setInputValue] = useState<string>("");
    
    const {handleGenerate, isFetching, isError} = useUpdatePosts({inputValue});

    return (
        <motion.form 
            initial={{ opacity: "0%" }} 
            animate={{ opacity: "100%" }} 
            className="flex flex-col bg-[#525151] p-5 gap-5 justify-center rounded-md"  
            onSubmit={(e)=>{e.preventDefault()}}
        >
            <div className="flex justify-center gap-5">
                <input 
                    type="text" 
                    name="text" 
                    value={inputValue} 
                    onChange={(e)=>setInputValue(e.target.value)}
                    className="border-b outline-none p-2 bg-transparent w-full text-white"
                    placeholder="Enter theme"
                />
                <motion.button 
                    type="button" 
                    animate={{ 
                        opacity: isFetching ?"50%": "100%" } } 
                        transition={{
                            duration: 0.25,
                            ease: [0.4, 0.0, 0.2, 1]
                        }} 
                        className="bg-[#0e0b0b] text-white p-2 pl-10 pr-10 rounded-md hover:brightness-110" 
                        disabled={isFetching} 
                        onClick={handleGenerate}
                    >
                        Generate
                    </motion.button>
            </div>
            {isFetching &&
                <div 
                    className="text-center flex flex-col justify-center items-center text-2xl text-white"
                >
                    <Loader2Icon size={"100px"} color="#fff" className="animate-spin" strokeWidth={"1px"} />loading..
                </div>
            }
            {isError && 
                <div 
                    className="text-center text-white flex flex-col justify-center items-center"
                    >
                    <MailX strokeWidth={1} size={"100px"} />Error, try again
            </div>}
        </motion.form>
    );
}
