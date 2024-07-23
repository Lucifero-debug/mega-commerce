
import { wixClientServer } from "@/lib/wixClientServer";
import { products } from "@wix/stores";
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react";

const Featured =async ({
  categoryId,
  limit,
  searchParams,
}: {
  categoryId: string;
  limit?: number;
  searchParams?: any;
}) => {

  const wixClient = wixClientServer()
  


  const res = (await wixClient).products.queryProducts().eq("collectionIds",categoryId).limit(limit || 20).find();
  
      const real=await res

  return (
    <div className="flex flex-row gap-6">
      {real.items?.map((product: products.Product)=>(

    <div className="flex flex-col w-1/4 h-full border-5 border-black" key={product._id}>
      <Link href={"/" + product.sku} className="flex flex-col gap-5">
        <div className="relative w-full h-[30vh]">
        <Image alt="" src={product.media?.mainMedia?.image?.url || "/product.png"} fill sizes="25vw" className="object-cover"  />
        </div>
<div className="price flex justify-between w-full">
    <h1 className="font-bold text-xl">{product.name}</h1>
    <h1 className="font-bold text-xl">{product.price?.price}</h1>
</div>
<p className="text-gray-500 w-full">{product.description}</p>
<button className="rounded-lg text-xs hover:bg-lama hover:text-white ring-lama text-lama ring-1 w-[6vw] h-8">Add To Cart</button>
      </Link>
    </div>
      ))}

    </div>
  )
}

export default Featured
