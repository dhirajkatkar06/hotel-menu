"use client"

import { useState, useMemo } from "react"
import { Search, ShoppingCart } from "lucide-react"
import MenuCard from "@/components/menu-card"
import CategoryTabs from "@/components/category-tabs"
import CartModal from "@/components/cart-modal"
import { menuItems, categories } from "@/lib/menu-data"

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [cartItems, setCartItems] = useState<Array<{ id: string; name: string; price: number; quantity: number }>>([])
  const [isCartOpen, setIsCartOpen] = useState(false)

  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      const matchesCategory = selectedCategory === "All" || item.category === selectedCategory
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [selectedCategory, searchQuery])

  const handleAddToCart = (item: any) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === item.id)
      if (existing) {
        return prev.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i))
      }
      return [...prev, { id: item.id, name: item.name, price: item.price, quantity: 1 }]
    })
  }

  const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className="min-h-screen bg-amber-50">
      <div style={{ backgroundColor: "#372F10" }} className="text-white py-3 px-4 text-center">
        <p className="text-sm md:text-base font-semibold">
          🎉 Special Offer: Get 20% off on orders above ₹500! Use code SAVE20
        </p>
      </div>

      <header className="bg-gradient-to-b from-amber-900 via-amber-800 to-amber-700 py-12 px-4 sticky top-0 z-40 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "url('/vintage-coffee-shop-sketches-utensils-pattern.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "repeat",
          }}
        />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-white">Menu</h1>
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative text-white px-6 py-2 rounded-full font-semibold flex items-center gap-2 transition-all whitespace-nowrap hover:opacity-90"
              style={{ backgroundColor: "#372F10" }}
            >
              <ShoppingCart size={20} />
              <span className="hidden sm:inline">View Cart</span>
              {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold -translate-y-2 translate-x-2">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search for a dish..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-full bg-white text-slate-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-600"
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="relative rounded-2xl overflow-hidden mb-8">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: "url('/placeholder.svg?height=400&width=800')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="relative bg-gradient-to-r from-slate-900/90 to-slate-800/90 px-8 py-12 text-center rounded-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Our Menu</h2>
            <p className="text-gray-200 text-lg">Discover our delicious selection of dishes</p>
          </div>
        </div>

        {/* Category Tabs */}
        <CategoryTabs
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          {filteredItems.map((item) => (
            <MenuCard key={item.id} item={item} onAddToCart={handleAddToCart} />
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-gray-500">No items found matching your search.</p>
          </div>
        )}
      </main>

      {isCartOpen && (
        <CartModal
          cartItems={cartItems}
          setCartItems={setCartItems}
          cartTotal={cartTotal}
          onClose={() => setIsCartOpen(false)}
        />
      )}
    </div>
  )
}
