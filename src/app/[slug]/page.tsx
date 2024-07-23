

import Add from "@/components/Add"
import Customize from "@/components/Customize"
import ProductImage from "@/components/ProductImage"
import { wixClientServer } from "@/lib/wixClientServer"
import { products } from "@wix/stores"
import Image from "next/image"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import DOMPurify from "isomorphic-dompurify";

const Page = async({ params }: { params: { slug: string } }) => {

  const wixClient = await wixClientServer();


  const products = await wixClient.products
    .queryProducts()
    .eq("sku", params.slug)
    .find();
    
    const product=products.items[0]
    
   

  return (
    <div className="w-full flex justify-center">
      <div className="base w-[90%] h-full flex gap-7">
   <ProductImage product={product}/>
      <div className="info w-1/2 h-full flex flex-col gap-5">
      <h1 className="text-4xl font-medium ">{product?.name}</h1>
     <p className="text-gray-500" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(product.description || "") }}></p>
     <div className="h-[2px] bg-gray-100" />
     <div className="price flex gap-5">
      <h1 className="line-through text-2xl font-medium text-gray-500">&#x20B9;{product?.price?.discountedPrice}</h1>
      <h1 className="text-2xl text-black font-medium">&#x20B9;{product?.price?.price}</h1>
     </div>
     <div className="h-[2px] bg-gray-100" />
     {product.variants && product.productOptions ? (
          <Customize
            productId={product._id!}
            variants={product.variants}
            productOptions={product.productOptions}
          />
        ) : (
          <Add
            productId={product._id!}
            variantId="00000000-0000-0000-0000-000000000000"
            stockNumber={product.stock?.quantity || 0}
          />
        )}
     <div className="h-[2px] bg-gray-100"/>
     {product?.additionalInfoSections?.map((info)=>(
     <div className="misc text-sm flex flex-col gap-4" key={info?.title}>
      <h1 className="font-medium">{info.title}</h1>
      <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(info.description || "") }}></p>
      <div className="h-[2px] bg-gray-100" />
     </div>
     ))}     
      </div>
      </div>
    </div>
  )
}

export default Page
