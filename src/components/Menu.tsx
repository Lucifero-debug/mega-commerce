"use client"

import { useState } from "react"
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/hooks/useCartStore";
import CartModal from "./CartModal";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useWixClient } from "@/hooks/useWixClient";

const Menu = () => {
  const [open, setOpen] = useState(false);
  const {  counter } = useCartStore();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const router = useRouter();
  const wixClient = useWixClient();

  const handleLogout = async () => {
    Cookies.remove("refreshToken");
    const { logoutUrl } = await wixClient.auth.logout(window.location.href);
    router.push(logoutUrl);
 };

  return (
    <div className="">
      <Image
        src="/menu.png"
        alt=""
        width={28}
        height={28}
        className="cursor-pointer"
        onClick={() => setOpen((prev) => !prev)}
      />
      {open && (
        <div className="absolute bg-black text-white left-0 top-20 w-full h-[calc(100vh-80px)] flex flex-col items-center justify-center gap-8 text-xl  z-10">
          <Link href="/" onClick={()=>setOpen(false)}>Homepage</Link>
          <Link href="/">Shop</Link>
          <Link href="/">Deals</Link>
          <Link href="/">About</Link>
          <Link href="/">Contact</Link>
          <Link href="/" onClick={handleLogout}>Logout</Link>
          <Link href="/" onClick={()=>setIsCartOpen((prev)=>!prev)}>Cart({counter})</Link>
        </div>
      )}
       {isCartOpen && <CartModal />}
    </div>
  )
}

export default Menu
