// "use client"

import Category from "@/components/Category";
import Featured from "@/components/Featured";
import Skeleton from "@/components/Skeleton";
import Slider from "@/components/Slider";
import { Suspense, useEffect } from "react";



export default  function Home() {

  

  return (
  <div className="w-full">
    <Slider/>
    <div className=" w-full h-[65vh] flex justify-center mt-20">
      <div className="w-3/4 flex flex-col gap-4 h-[70vh]">
      <h1 className="font-bold text-xl">Featured Product</h1>
  <Suspense fallback={<Skeleton/>}>
  <Featured categoryId={process.env.FEATURED_PRODUCTS_CATEGORY_ID || ""} limit={4}/>
  </Suspense>
      </div>
    </div>
    <div className=" mt-20 w-full flex flex-col h-[60vh] gap-9">
      <div className="relative left-[20%]">
    <h1 className="font-bold text-xl">Categories</h1>
      </div>
      <div className="product w-full h-70vh border-5 border-yellow-600">
      <Suspense fallback={<Skeleton/>}>
        <Category/>
        </Suspense>
      </div>
    </div>
    <div className=" w-full h-[70vh] flex justify-center mt-24 border-5 border-red-600">
      <div className="w-3/4 flex flex-col gap-4">
      <h1 className="font-bold text-xl">New Product</h1>
<div className="flex flex-row gap-12 w-full">
  <Featured  categoryId={process.env.FEATURED_PRODUCTS_CATEGORY_ID || ""} limit={4}/>
</div>
      </div>
    </div>
  </div>
  );
}
