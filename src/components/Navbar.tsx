"use client"
import Image from "next/image"
import Menu from "./Menu"
import { useState } from "react"
import { useRouter } from "next/navigation";
import NavIcons from "./NavIcons";


const Navbar = () => {
const[text,setText]=useState("")
const router = useRouter();

  const handleSearch=(e:any)=>{
if(text){
  router.push(`/list?name=${text}`)
}

  }
  return (
    <div className="flex justify-center h-[4vw] w-full border-2 border-yellow-500">
    <div className="flex gap-7 w-[90vw]">
      <div className="flex w-[60vw]  justify-start   items-center gap-7">
        <div className="flex items-center">
   <Image src="/logo.png"alt="" width={38} height={38}/>
   <div className="font-extrabold text-xl">BAMA</div>
        </div>
        <div className="">
            <Menu/>
        </div>
      </div>
      <div className="flex items-center w-2/3 justify-start  ">
        <div className="w-2/3 flex mr-6">
            <input type="search" placeholder="Search" className="w-full border-0 bg-gray-100 focus:outline-none" onChange={(e)=>setText(e.target.value)} />
            <button className="cursor-pointer" onClick={handleSearch}>
        <Image src="/search.png" alt="" width={16} height={16} />
      </button>
        </div>
        <div className="options flex gap-2">
          <NavIcons/>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Navbar
