"use client";

import { Card } from "@components";
import { useState, useEffect } from "react";

export default function CategoriesView({ products }) {
  const [selectedTab, setSelectedTab] = useState("New Arrivals");
  const [filteredProducts, setFilteredProducts] = useState([]);

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  useEffect(() => {
    const filterProducts = () => {
      switch (selectedTab) {
        case "New Arrivals":
          setFilteredProducts(products.filter((product) => product.isNew));
          break;

        case "Best Sellers":
          setFilteredProducts(products.filter((product) => product.rating > 4));
          break;

        case "Sale Items":
          setFilteredProducts(
            products.filter((product) => product.discount < 5)
          );
          break;

        default:
          setFilteredProducts(products);
      }
    };
    filterProducts();
  }, [selectedTab]);

  return (
    <div className="flex flex-col gap-y-5 items-center justify-center">
      <ul className="flex flex-wrap gap-y-4 items-center justify-center gap-x-12 font-semibold text-xl">
        <li
          onClick={() => handleTabChange("New Arrivals")}
          className={`${
            selectedTab == "New Arrivals" ? "text-black" : "text-gray-600"
          } hover:text-black transition-colors duration-300 cursor-pointer`}
        >
          New Arrivals
        </li>
        <li
          onClick={() => handleTabChange("Best Sellers")}
          className={`${
            selectedTab == "Best Sellers" ? "text-black" : "text-gray-600"
          } hover:text-black transition-colors duration-300 cursor-pointer`}
        >
          Best Sellers
        </li>
        <li
          onClick={() => handleTabChange("Sale Items")}
          className={`${
            selectedTab == "Sale Items" ? "text-black" : "text-gray-600"
          } hover:text-black transition-colors duration-300 cursor-pointer`}
        >
          Sale Items
        </li>
      </ul>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 mt-8">
        {filteredProducts?.map(product => (
            <Card key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
