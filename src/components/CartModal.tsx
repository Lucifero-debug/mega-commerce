"use client"

import Image from "next/image"
import { media as wixMedia } from "@wix/sdk";
import { useWixClient } from "@/hooks/useWixClient";
import { currentCart } from "@wix/ecom";
import { useCartStore } from "@/hooks/useCartStore";
import { useEffect } from "react";

const CartModal = () => {

  const wixClient = useWixClient();
  const { cart, isLoading, removeItem,getCart } = useCartStore();

  useEffect(()=>{
    getCart(wixClient)
  },[getCart,wixClient])

  console.log("cartyr",cart)

  return (
    <div className="w-max absolute p-4 rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-white top-12 right-0 flex flex-col gap-6 z-20">
     {!cart.lineItems ? (
        <div className="">Cart is Empty</div>
      ) : (
        <>
        
      <h2 className="text-xl">Shopping Cart</h2>
      <div className="flex flex-col gap-8">
        {cart.lineItems.map((item)=>(
      <div className="flex gap-4" key={item._id}>
        {item.image && (
          <Image src={wixMedia.getScaledToFillImageUrl(
            item.image,
            72,
            96,
            {}
          )} alt=""  className="object-cover rounded-md" width={72} height={96}/>
        )}
        <div className="flex flex-col justify-between w-full">
        <div className="">
            {/* title */}
        <div className="flex items-center justify-between gap-8">
        <h3 className="font-semibold">
        {item.productName?.original}
                      </h3>
                      <div className="p-1 bg-gray-50 rounded-sm flex items-center gap-2">
                        {item.quantity && item.quantity>1 &&(
                      <div className="text-xs text-green-500">
                            {item.quantity} x{" "}
                          </div>
                        )}
                          {item.price?.amount}
                        </div>
            </div>
            {/* desc */}
            <div className="text-sm text-gray-500">
                    {item.availability?.status}
                    </div>
            </div>
            {/* bottom */}
            <div className="flex justify-between text-sm">
            <span className="text-gray-500">Qty. {item.quantity}</span>
            <span
                      className="text-blue-500"
                      style={{ cursor: isLoading ? "not-allowed" : "pointer" }}
                      onClick={() => removeItem(wixClient, item._id!)}
                    >
                      Remove
                    </span>
                </div>
            </div>
        </div>
        ))}
            {/* top */}

        </div>
        {/* bottom */}
        <div className="">
        <div className="flex items-center justify-between font-semibold">
              <span className="">Subtotal</span>
              <span className="">&#x20B9;{cart.subtotal.amount}</span>
            </div>
            <p className="text-gray-500 text-sm mt-2 mb-4">
              Shipping and taxes calculated at checkout.
            </p>
            <div className="flex justify-between text-sm">
            <button className="rounded-md py-3 px-4 ring-1 ring-gray-300">
                View Cart
              </button>
              <button
                className="rounded-md py-3 px-4 bg-black text-white disabled:cursor-not-allowed disabled:opacity-75"
                // disabled={isLoading}
                // onClick={handleCheckout}
              >
                Checkout
              </button>
                </div>
            </div>
        </>
      )}
            </div>
  )
}

export default CartModal
