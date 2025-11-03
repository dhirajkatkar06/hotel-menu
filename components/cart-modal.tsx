"use client";

import { X, Trash2, Plus, Minus } from "lucide-react";
import { useState } from "react";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export default function CartModal({
  cartItems,
  setCartItems,
  cartTotal,
  onClose,
}: {
  cartItems: CartItem[];
  setCartItems: (items: CartItem[]) => void;
  cartTotal: number;
  onClose: () => void;
}) {
  const [tableNumber, setTableNumber] = useState<number | null>(null);
  const [error, setError] = useState<string>("");

  const THEME = "#372F10";

  const handleUpdateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      setCartItems(cartItems.filter((item) => item.id !== id));
    } else {
      setCartItems(
        cartItems.map((item) => (item.id === id ? { ...item, quantity } : item))
      );
    }
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const handleWhatsAppOrder = () => {
    if (cartItems.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    if (!tableNumber) {
      setError("Table number is required before placing an order.");
      return;
    }

    const itemsList = cartItems
      .map(
        (item) =>
          `${item.name} x${item.quantity} - ₹${item.price * item.quantity}`
      )
      .join("%0A");

    const message = `Hi, I would like to place an order:%0A%0A${itemsList}%0A%0ATotal: ₹${cartTotal}%0ATable Number: ${tableNumber}`;

    window.open(`https://wa.me/919769708255?text=${message}`, "_blank");
  };

  const isOrderDisabled = !tableNumber || cartItems.length === 0;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-end z-50">
      <div className="bg-white w-full md:max-w-md rounded-t-3xl md:rounded-3xl md:absolute md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
          <h2 className="text-2xl font-bold text-gray-900">Your Cart</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={24} className="text-gray-600" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="p-6">
          {cartItems.length === 0 ? (
            <p className="text-center text-gray-500 py-8">Your cart is empty</p>
          ) : (
            <div className="space-y-4 mb-6">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center border-b border-gray-100 pb-4"
                >
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{item.name}</p>
                    <p className="text-sm font-semibold" style={{ color: THEME }}>
                      ₹{item.price}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() =>
                        handleUpdateQuantity(item.id, item.quantity - 1)
                      }
                      className="p-1 bg-gray-100 hover:bg-gray-200 rounded transition-colors"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-8 text-center font-semibold">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        handleUpdateQuantity(item.id, item.quantity + 1)
                      }
                      className="p-1 bg-gray-100 hover:bg-gray-200 rounded transition-colors"
                    >
                      <Plus size={16} />
                    </button>
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="p-1 bg-red-100 hover:bg-red-200 rounded transition-colors ml-2"
                    >
                      <Trash2 size={16} className="text-red-600" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Total & Table Selector */}
          {cartItems.length > 0 && (
            <>
              <div className="text-lg font-bold text-gray-900 mb-4 pt-2">
                Total: <span style={{ color: THEME }}>₹{cartTotal}</span>
              </div>

              {/* Table Number Dropdown */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Table Number
                </label>

                <select
                  value={tableNumber ?? ""}
                  onChange={(e) => {
                    const value = e.target.value ? Number(e.target.value) : null;
                    setTableNumber(value);
                    setError("");
                  }}
                  className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-700"
                >
                  <option value="">Select Table</option>
                  {Array.from({ length: 10 }, (_, i) => (
                    <option key={i + 1} value={i + 1}>
                      Table {i + 1}
                    </option>
                  ))}
                </select>

                {!tableNumber && (
                  <p className="text-red-500 text-sm mt-2">
                    Table number is required before placing an order.
                  </p>
                )}
              </div>

              {/* Order Button */}
              <button
                onClick={handleWhatsAppOrder}
                disabled={isOrderDisabled}
                className={`w-full text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed`}
                style={{
                  backgroundColor: isOrderDisabled ? "#9E9E9E" : THEME,
                }}
              >
                {tableNumber ? "Order via WhatsApp" : "Select Table to Order"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
