

import Filter from "@/components/Filter"
import Pagination from "@/components/Pagination";
import SingleProduct from "@/components/SingleProduct"
import Skeleton from "@/components/Skeleton";
import { wixClientServer } from "@/lib/wixClientServer";
import Image from "next/image"
import { Suspense } from "react";

const page = async({ searchParams }: { searchParams: any }) => {

  const wixClient = await wixClientServer();

  const cat = await wixClient.collections.getCollectionBySlug(
    searchParams.cat || "all-products"
  );

  return (
    <div className="w-full flex flex-col gap-6">
        <div className="first flex w-full h-[40vh] bg-pink-50 ">
        <div className="text flex flex-col w-1/2 h-full gap-12 mt-12 items-end border-5 border-green-600">
            <h1 className="text-4xl font-extrabold w-[2/3] h-1/5">Grab up to 50% off on<br/>Selected Products</h1>
            <button className="rounded-xl text-white bg-lama w-20 h-10 flex justify-center items-center mr-20 active:scale-75">Buy Now</button>
        </div>
        <div className="woman w-1/2 relative">
        <Image src="/woman.png" alt="" fill objectFit="contain"/>
        </div>
        </div>
        <div className="filter">
      <Filter/>
        </div>
        <div className="products w-full h-[full] flex justify-center">
            <div className="base w-[90%] h-full flex flex-col gap-5">
            <h1 className="text-2xl font-bold">All Products For You!</h1>
            <div className="w-full"> 
              <Suspense fallback={<Skeleton/>}>
               <SingleProduct cat={cat.collection?._id} searchParams={searchParams} limit={8}/>
                </Suspense>                          
            </div>
            </div>
        </div>
    </div>
  )
}

export default page
