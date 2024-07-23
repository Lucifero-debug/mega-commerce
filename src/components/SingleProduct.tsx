

import { wixClientServer } from "@/lib/wixClientServer"
import Image from "next/image"
import Link from "next/link";
import Pagination from "./Pagination";
import DOMPurify from "isomorphic-dompurify";

const PRODUCT_PER_PAGE = 8;


const SingleProduct =async ({cat,searchParams,limit}:{cat:any, searchParams?: any,limit:number}) => {

  const wixClient =await wixClientServer()


  const res =  wixClient.products
  .queryProducts()
  .eq("collectionIds",cat)
  .gt("priceData.price", searchParams?.min || 0)
  .startsWith("name", searchParams?.name || "")
  .lt("priceData.price", searchParams?.max || 999999)
  .hasSome(
    "productType",
    searchParams?.type ? [searchParams.type] : ["physical", "digital"]
  )
  .limit(limit || PRODUCT_PER_PAGE)
  .skip(
    searchParams?.page
      ? parseInt(searchParams.page) * (limit || PRODUCT_PER_PAGE)
      : 0
  ).find();;

  const real=await res


  return (

    <div className="flex flex-col gap-12">
    <div className="grid grid-cols-4 gap-7">
      {real.items.map((item:any)=>(
        <Link key={item._id} href={"/" + item.sku} >
    <div className="flex flex-col w-full h-full border-5 border-black gap-3">
    <div className="relative w-full h-[30vh]">
    <Image alt="" src={item.media?.mainMedia?.image?.url || ""} fill sizes="25vw" className="object-cover"  />
    </div>
<div className="price flex flex-row justify-between">
<h1 className="font-bold text-xl">{item.name}</h1>
<h1 className="font-bold text-xl">&#x20B9;{item.priceData?.price}</h1>
</div>
<p className="text-gray-500" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item.description) }}></p>
<button className="rounded-lg text-xs hover:bg-lama hover:text-white ring-lama text-lama ring-1 w-[6vw] h-8">Add To Cart</button>
</div>  
        </Link>

      ))}
    </div>
    <div className="button w-full flex justify-center h-[1vh] pt-8">
        <div className="w-full">
          <Pagination currentPage={real.currentPage || 0}
          hasPrev={real.hasPrev()}
          hasNext={real.hasNext()}/>
        </div>
        </div>
    </div>
  )
}

export default SingleProduct
