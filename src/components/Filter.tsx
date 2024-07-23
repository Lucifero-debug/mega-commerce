"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Filter = () => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { replace } = useRouter();

    const handleFilterChange = (
        e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
      ) => {
        const { name, value } = e.target;
        const params = new URLSearchParams(searchParams);
        params.set(name, value);
        replace(`${pathname}?${params.toString()}`);
      };

  return (
    <div className="second flex justify-center h-[10vh] mt-6">
    <div className="base w-[90%] h-full flex justify-between">
    <div className="option flex h-6 gap-7">
        <select name="type" id="" className="rounded-lg" onChange={handleFilterChange}>
            <option value="">Type</option>
            <option value="physical">Physical</option>
            <option value="digital">digital</option>
        </select>
        <input type="number" placeholder="Min Price" name="min" className="w-24 rounded-lg" onChange={handleFilterChange}/>
        <input type="number" placeholder="Max Price" name="max" className="w-24 rounded-lg" onChange={handleFilterChange}/>
        <select name="categories" id="" className="rounded-lg" onChange={handleFilterChange}>
            <option value="">Categories</option>
            <option value="New Arrival">New Arrival</option>
            <option value="Popular">Popular</option>
        </select>
        <select name="filters" id="" className="rounded-lg">
            <option value="red">All Filters</option>
        </select>
    </div>
    <div className="sort w-[16vw]">
    <select name="sort" id="" className="rounded-lg w-[11vw] h-9" onChange={handleFilterChange}>
            <option value="">Sort By</option>
            <option value="asc price">Price (low to high)</option>
              <option value="desc price">Price (high to low)</option>
              <option value="asc lastUpdated">Newest</option>
              <option value="desc lastUpdated">Oldest</option>
        </select>
    </div>
    </div>
            </div>
  )
}

export default Filter
