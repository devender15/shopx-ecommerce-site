"use client";

import { useState, useEffect } from "react";
import { client } from "@lib/client";
import { Breadcrumb, Dropdown, Card, Modal } from "@components";
import { SORT_BY } from "@constants";
import { TailSpin } from "react-loader-spinner";
import { useStateContext } from "@context/StateContext";

export default function Page({ params }) {
  const { handleOpenProductInfoModal, selectedProduct, setShowProductInfoModal, showProductInfoModal } = useStateContext();
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [products, setProducts] = useState([]);
  const [sortby, setSortby] = useState("high-low");
  const [isFetchingProducts, setIsFetchingProducts] = useState(false);

  // useEffects

  useEffect(() => {
    const updateCategories = () => {
      setCategory(params.name[0]);
      setSubCategory(params.name[1]);
    };
    updateCategories();
  }, [category, subCategory]);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsFetchingProducts(true);
      const response = await client.fetch(
        `*[_type == 'product' && category == '${category}' && subCategory == '${subCategory}']`
      );
      setProducts(response);
      setIsFetchingProducts(false);
    };
    fetchProducts();
  }, [category, subCategory]);

  useEffect(() => {
    const updateSortby = () => {
      switch (sortby) {
        case "new":
          // sorting the products state according to their _createdAt (which is in this format: 2023-07-22T10:56:56Z) property
          setProducts((prev) => {
            let newArr = [...prev];
            newArr.sort((a, b) => {
              return new Date(b._createdAt) - new Date(a._createdAt);
            });
            console.log(newArr);
            return newArr;
          });
          break;
        case "high-low":
          console.log("high-low");
          setProducts((prev) => {
            let newArr = [...prev];
            newArr.sort((a, b) => {
              return b.price - a.price;
            });
            console.log(newArr);
            return newArr;
          });
          break;
        case "low-high":
          console.log("low-high");
          setProducts((prev) => {
            let newArr = [...prev];
            newArr.sort((a, b) => {
              return a.price - b.price;
            });
            console.log(newArr);
            return newArr;
          });
          break;
        case "old":
          console.log("old");
          setProducts((prev) => {
            let newArr = [...prev];
            newArr.sort((a, b) => {
              return new Date(a._createdAt) - new Date(b._createdAt);
            });
            console.log(newArr);
            return newArr;
          });
          break;
        default:
          break;
      }
    };
    updateSortby();
  }, [sortby]);

  // functions
  const handleSortBy = (value) => {
    setSortby(value);
  };

  return (
    <>
      <div className="min-h-screen w-screen">
        <Breadcrumb currentPath={category} />

        <div className="w-full flex justify-start md:justify-end px-1 md:px-4 py-2">
          <Dropdown
            title="Sort By"
            list={SORT_BY}
            handleSortBy={handleSortBy}
          />
        </div>

        <section>
          {isFetchingProducts ? (
            <div className="flex justify-center items-center">
              <TailSpin
                height="50"
                width="50"
                color="gray"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-4 py-2">
              {products.map((product) => (
                <Card
                  key={product._id}
                  product={product}
                  productsArray={products}
                  handleOpenProductInfoModal={handleOpenProductInfoModal}
                />
              ))}
            </div>
          )}
        </section>
      </div>
      <Modal
        isOpen={showProductInfoModal}
        productData={selectedProduct}
        onClose={() => setShowProductInfoModal(false)}
      />
    </>
  );
}
