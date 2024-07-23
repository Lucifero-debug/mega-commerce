"use client"

import Image from 'next/image'
import { useState } from 'react'

const ProductImage = ({product}:{product:any}) => {
    const [index,setIndex]=useState(0)

  return (
    <>
    <div className="h-[2px] bg-gray-100" />
    <div className="img h-full w-1/2 flex flex-col gap-14 sticky top-0">
<div className="big w-full h-[60vh] relative">
   <Image src={product?.media?.items[index]?.image?.url || ""} alt="" fill objectFit="cover"/>
</div>
<div className="small w-full flex h-[23vh] gap-5">
{product?.media?.items?.map((pic:any,index:number)=>(
  <Image src={pic.image?.url || ""} alt="" width={140} height={40} key={pic._id} className="cursor-pointer" onClick={()=>setIndex(index)}/>
))}
</div>
    </div>
    </>
  )
}

export default ProductImage
