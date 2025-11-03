"use client"

import { Plus } from "lucide-react"
import { useState } from "react"
import Image from "next/image"

interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  category: string
  image: string
}

export default function MenuCard({ item, onAddToCart }: { item: MenuItem; onAddToCart: (item: MenuItem) => void }) {
  const [isAdding, setIsAdding] = useState(false)

  const handleAdd = () => {
    onAddToCart(item)
    setIsAdding(true)
    setTimeout(() => setIsAdding(false), 1000)
  }

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow border border-gray-100 flex flex-row md:flex-col">
      {/* Image - smaller on mobile (horizontal), full width on desktop (vertical) */}
      <div className="relative w-24 h-24 md:w-full md:h-40 flex-shrink-0">
        <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
      </div>

      {/* Content and Button */}
      <div className="flex-1 p-3 md:p-4 flex flex-col justify-between">
        <div className="flex-1 mb-2 md:mb-3">
          <h3 className="text-sm md:text-base font-semibold text-gray-900 mb-1">{item.name}</h3>
          <p className="text-xs text-gray-600 mb-2 md:mb-3 line-clamp-2">{item.description}</p>
        </div>

        <div className="flex items-center justify-between gap-2 md:flex-col md:items-start">
          <p className="text-lg md:text-xl font-bold" style={{ color: "#372F10" }}>
            ₹ {item.price}
          </p>

          <button
            onClick={handleAdd}
            className={`flex-shrink-0 flex items-center justify-center gap-1 py-2 px-3 md:px-4 rounded-full font-semibold text-white transition-all whitespace-nowrap text-sm md:text-base ${
              isAdding ? "bg-green-500" : "hover:opacity-90 active:scale-95"
            }`}
            style={{ backgroundColor: isAdding ? "#22c55e" : "#372F10" }}
          >
            <Plus size={16} />
            {isAdding ? "Added!" : "Add"}
          </button>
        </div>
      </div>
    </div>
  )
}
