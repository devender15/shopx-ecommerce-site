"use client";

import { useState, useEffect } from "react";

export default function Page({ params }) {
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");

  // useEffects

  useEffect(() => {
    const updateCategories = () => {
      setCategory(params.name[0]);
      setSubCategory(params.name[1]);
    }
    updateCategories();
  }, [category, subCategory])


  return <div className="min-h-screen w-screen">{category}</div>;
}
