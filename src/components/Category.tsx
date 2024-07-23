

import Link from "next/link";
import Image from "next/image";
import { wixClientServer } from "@/lib/wixClientServer";



const Category = async() => {

  const wixClient=await wixClientServer()

const cat=await wixClient.collections.queryCollections().find()

  return (
   <div className="overflow-x-scroll scrollbar-hide flex h-full ml-10">
    {cat.items.map((slides)=>(
    <Link href={`/list?cat=${slides.slug}`} className="min-w-[20%] h-[60vh]" key={slides._id}>
    <div className="w-full h-full ">
    <div className="h-[70%] w-full  relative">
    <Image src={slides.media?.mainMedia?.image?.url || ""} alt="" sizes="25vw" fill />
    </div>
    <div className="flex items-center h-[30%]">
      <h1 className="font-semibold">{slides.name}</h1>
    </div>
    </div>
    </Link>
    ))}
  
   </div>
  )
}

export default Category
