"use client"
import Image from "next/image";
import { useState } from "react";

const slides = [
    {
      id: 1,
      title: "Summer Sale Collections",
      description: "Sale! Up to 50% off!",
      img: "https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=800",
      url: "/",
      bg: "bg-gradient-to-r from-yellow-50 to-pink-50",
    },
    {
      id: 2,
      title: "Summer Sale Collections",
      description: "Sale! Up to 50% off!",
      img: "https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=800",
      url: "/",
      bg: "bg-gradient-to-r from-yellow-50 to-pink-50",
    },
    {
      id: 3,
      title: "Summer Sale Collections",
      description: "Sale! Up to 50% off!",
      img: "https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=800",
      url: "/",
      bg: "bg-gradient-to-r from-yellow-50 to-pink-50",
    },
    {
      id: 4,
      title: "Summer Sale Collections",
      description: "Sale! Up to 50% off!",
      img: "https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=800",
      url: "/",
      bg: "bg-gradient-to-r from-yellow-50 to-pink-50",
    },
  ];
const Slider = () => {

      const [current, setCurrent] = useState(0);

  return (
    <>
    <div className=" h-[calc(100vh-80px)] overflow-hidden flex flex-col">
      <div  className="w-max h-full flex transition-all ease-in-out duration-1000" style={{ transform: `translateX(-${current * 100}vw)` }}>
        {slides.map((slide)=>(
            <div className=" h-full w-full flex" key={slide.id}>
                <div className="flex flex-col w-1/2 h-full items-center justify-center gap-6 ">
      <h1 className="text-4xl font-bold">{slide.description}</h1>
      <h1 className="text-6xl font-extrabold">{slide.title}</h1>
      <button className="bg-black text-white w-24 h-8 cursor-pointer active:scale-75">Shop now</button>
                </div>
            <div className="right h-full w-1/2 ">
            <Image src={slide.img} alt="" className="object-cover" width={800} height={500}/>
            </div>
            </div>
        ))}
      </div>
      <div className=" absolute m-auto bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
        {slides.map((slide,index)=>(
          <div key={slide.id} className={`w-3 h-3  rounded-full ring-1  ring-gray-600 cursor-pointer flex items-center justify-center ${
            current === index ? "scale-150" : ""
          }`} onClick={()=>setCurrent(index)}>
          {current === index && (
              <div className="w-[6px] h-[6px] bg-gray-600 rounded-full"></div>
            )}
          </div>
        ))}
      </div>
    </div>
    </>
  )
}

export default Slider
