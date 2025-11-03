"use client"

interface CategoryTabsProps {
  categories: string[]
  selectedCategory: string
  onSelectCategory: (category: string) => void
}

export default function CategoryTabs({ categories, selectedCategory, onSelectCategory }: CategoryTabsProps) {
  return (
    <div className="overflow-x-auto scrollbar-hide">
      <div className="flex gap-2 pb-4 border-b border-gray-200 min-w-min md:min-w-0">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className={`px-4 py-2 rounded-full font-medium whitespace-nowrap transition-all ${
              selectedCategory === category ? "bg-accent text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  )
}
