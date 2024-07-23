"use client"

import { useCartStore } from "@/hooks/useCartStore";
import { useWixClient } from "@/hooks/useWixClient";
import { useState } from "react"

const Add = ({
  productId,
  variantId,
  stockNumber,
}: {
  productId: string;
  variantId: string;
  stockNumber: number;
}) => {
const [quantity,setQuantity]=useState(1)

const handleQuantity = (type: "i" | "d") => {
    if (type === "d" && quantity>1) {
      setQuantity((prev) => prev - 1);
    }
    if (type === "i" ) {
      setQuantity((prev) => prev + 1);
    }
  };

  const wixClient = useWixClient();

  const { addItem, isLoading } = useCartStore();

  const handleAdd=()=>{
    addItem(wixClient, productId, variantId, quantity)
  }

  return (
    <div className="flex justify-between gap-4 items-center">
        <div className="flex flex-col gap-4">
      <h1 className="font-medium">Choose a Quantity</h1>
      <div className="flex gap-3">
        <div className="bg-gray-100 rounded-3xl py-2 px-4 flex items-center justify-between w-32">
            <button className="cursor-pointer text-xl flex justify-center items-center" onClick={()=>handleQuantity("d")}    disabled={quantity===1}>-</button>
             {quantity}
            <button className="cursor-pointer text-xl" onClick={()=>handleQuantity("i")} disabled={quantity===stockNumber}>+</button>
        </div>
        {stockNumber < 1 ? (
            <div className="text-xs">Product is out of stock</div>
          ) : (
            <div className="text-xs">
              Only <span className="text-orange-500">{stockNumber} items</span>{" "}
              left!
              <br /> {"Don't"} miss it
            </div>
          )}
      </div>
        </div>
      <button className="w-36 h-10 text-sm rounded-3xl ring-1 text-lama px-4 hover:bg-lama hover:text-white disabled:cursor-not-allowed disabled:bg-pink-200 disabled:text-white disabled:ring-none"    onClick={handleAdd}
          >Add to Cart</button>
    </div>
  )
}

export default Add
