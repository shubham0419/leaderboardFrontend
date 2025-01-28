"use client"

import React, { useState, useEffect, useRef } from "react"

interface Item {
  label: string
  id: string
}

interface CustomSearchSelectProps {
  items: Item[]
  onSelect: (id: string) => void
  placeholder?: string
}

export function CustomSearchSelect({ items, onSelect, placeholder = "Search items..." }: CustomSearchSelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState("")
  const [selectedItem, setSelectedItem] = useState<Item | null>(null)
  const [filteredItems, setFilteredItems] = useState<Item[]>(items)
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [wrapperRef])

  useEffect(() => {
    if (search) {
      setFilteredItems(items.filter((item) => item.label.toLowerCase().includes(search.toLowerCase())))
    } else {
      setFilteredItems(items)
    }
  }, [search, items])

  const handleSelect = (item: Item) => {
    setSelectedItem(item)
    onSelect(item.id)
    setIsOpen(false)
  }

  return (
    <div className="relative w-full" ref={wrapperRef}>
      <div
        className="w-full p-2 border rounded-md bg-white cursor-pointer flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={selectedItem ? "text-gray-900" : "text-gray-400"}>
          {selectedItem ? selectedItem.label : placeholder}
        </span>
        
      </div>
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg">
          <input
            type="text"
            className="w-full p-2 border-none rounded-md"
            placeholder={"Search..."}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <ul className="max-h-60 overflow-auto">
            {filteredItems.length === 0 ? (
              <li className="p-2 text-gray-500">Not found</li>
            ) : (
              filteredItems.map((item) => (
                <li key={item.id} className="p-2 hover:bg-gray-100 cursor-pointer rounded-md" onClick={() => handleSelect(item)}>
                  {item.label}
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  )
}

