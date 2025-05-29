"use client"
import React, { useState, useEffect } from "react";
import { assets} from "@/assets/assets";
import Link from "next/link"
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";

const Navbar = () => {

  const { isSeller, router, getCartCount, products } = useAppContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 5); // Limit to 5 results

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setShowResults(e.target.value.length > 0);
  };

  const handleProductClick = (productId) => {
    setSearchQuery('');
    setShowResults(false);
    router.push(`/product/${productId}`);
  };

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setShowResults(false);
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-32 py-3 border-b border-gray-300 text-gray-700">
      <Image
        className="cursor-pointer w-28 md:w-32"
        onClick={() => router.push('/')}
        src={assets.logo}
        alt="logo"
      />
      <div className="flex items-center gap-4 lg:gap-8 max-md:hidden">
        <Link href="/" className="hover:text-gray-900 transition">
          Home
        </Link>
        <Link href="/all-products" className="hover:text-gray-900 transition">
          Shop
        </Link>
        <Link href="/about" className="hover:text-gray-900 transition">
          About Us
        </Link>
        <Link href="/contact" className="hover:text-gray-900 transition">
          Contact
        </Link>

        {isSeller && <button onClick={() => router.push('/seller')} className="text-xs border px-4 py-1.5 rounded-full">Seller Dashboard</button>}

      </div>

      <div className="hidden md:flex items-center gap-4 relative" onClick={(e) => e.stopPropagation()}>
        <div className="relative">
          <div className="flex items-center border rounded-full px-4 py-1.5">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={handleSearch}
              className="outline-none text-sm w-48"
            />
            <Image className="w-4 h-4 ml-2" src={assets.search_icon} alt="search icon" />
          </div>
          
          {showResults && (
            <div className="absolute top-full mt-2 w-full bg-white border rounded-lg shadow-lg z-50">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <div
                    key={product._id}
                    onClick={() => handleProductClick(product._id)}
                    className="flex items-center gap-3 p-3 hover:bg-gray-50 cursor-pointer border-b last:border-b-0"
                  >
                    <Image
                      src={product.image[0]}
                      alt={product.name}
                      width={40}
                      height={40}
                      className="object-cover rounded"
                    />
                    <div>
                      <p className="text-sm font-medium">{product.name}</p>
                      <p className="text-xs text-gray-500">₹{product.offerPrice}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-3 text-sm text-gray-500 text-center">
                  No products found
                </div>
              )}
            </div>
          )}
        </div>

        <button onClick={() => router.push('/cart')} className="flex items-center gap-2 hover:text-gray-900 transition relative">
          <Image src={assets.cart_icon} alt="cart icon" />
          Cart
          {getCartCount() > 0 && (
            <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              {getCartCount()}
            </span>
          )}
        </button>
        <button className="flex items-center gap-2 hover:text-gray-900 transition">
          <Image src={assets.user_icon} alt="user icon" />
          Account
        </button>
      </div>

      <div className="flex items-center md:hidden gap-3">
        {isSeller && <button onClick={() => router.push('/seller')} className="text-xs border px-4 py-1.5 rounded-full">Seller Dashboard</button>}
        <button onClick={() => router.push('/cart')} className="flex items-center gap-2 hover:text-gray-900 transition relative">
          <Image src={assets.cart_icon} alt="cart icon" />
          {getCartCount() > 0 && (
            <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              {getCartCount()}
            </span>
          )}
        </button>
        <button className="flex items-center gap-2 hover:text-gray-900 transition">
          <Image src={assets.user_icon} alt="user icon" />
          Account
        </button>
      </div>
    </nav>
  );
};

export default Navbar;