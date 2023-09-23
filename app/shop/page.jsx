"use client";

import { useState, useEffect } from "react";
import { client } from "@lib/client";
import {
  Breadcrumb,
  Dropdown,
  Card,
  Modal,
  CategorySidebar,
  Sidebar,
  NoProductFound,
} from "@components";
import { SORT_BY } from "@constants";
import { TailSpin } from "react-loader-spinner";
import { useStateContext } from "@context/StateContext";
import { IoIosOptions } from "react-icons/io";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const {
    handleOpenProductInfoModal,
    selectedProduct,
    setShowProductInfoModal,
    showProductInfoModal,
  } = useStateContext();
  const [products, setProducts] = useState([]);
  const [openFilterSidebar, setFilterSidebar] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortby, setSortby] = useState("high-low");
  const [isFetchingProducts, setIsFetchingProducts] = useState(false);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState({
    CATEGORIES: "all-categories",
    SIZE: "all-sizes",
    PRICE: "all-prices",
  });
  const searchParams = useSearchParams();
  // get the query params from the url
  const categoryName = searchParams.get("cat");
  const size = searchParams.get("size");
  const price = searchParams.get("price");

  // getting the search parameter value
  const searchQuery = searchParams.get("q");

  // useEffects
  useEffect(() => {
    const fetchProducts = async () => {
      const queries = searchQuery
        ? `*[name match "${searchQuery}*" || subCategory match "${searchQuery}*"]`
        : `*[_type == 'product']`;

      setIsFetchingProducts(true);
      const response = await client.fetch(queries);
      setProducts(response);
      setIsFetchingProducts(false);
    };
    fetchProducts();
  }, [searchQuery]);

  useEffect(() => {
    const showUpdatedProducts = () => {
      // update the filtered products state according to the query params
      setFilteredProducts(
        products.filter(
          (prod) =>
            checkSelectedCategory(prod.category) &&
            checkSize(prod.size) &&
            checkPrice(prod.price)
        )
      );
    };

    // set the selected checkboxes state according to the query params
    setSelectedCheckboxes((prev) => {
      return {
        ...prev,
        CATEGORIES: categoryName ?? "all-categories",
        SIZE: size ?? "all-sizes",
        PRICE: price ?? "all-prices",
      };
    });

    showUpdatedProducts();
  }, [categoryName, size, price, products]);

  useEffect(() => {
    (() => {
      setFilteredProducts(
        products.filter(
          (prod) =>
            checkSelectedCategory(prod.category) &&
            checkSize(prod.size) &&
            checkPrice(prod.price)
        )
      );
    })();
  }, [selectedCheckboxes]);

  useEffect(() => {
    const updateSortby = () => {
      switch (sortby) {
        case "new":
          // sorting the products state according to their _createdAt (which is in this format: 2023-07-22T10:56:56Z) property
          setFilteredProducts((prev) => {
            let newArr = [...prev];
            newArr.sort((a, b) => {
              return new Date(b._createdAt) - new Date(a._createdAt);
            });
            return newArr;
          });
          break;
        case "high-low":
          setFilteredProducts((prev) => {
            let newArr = [...prev];
            newArr.sort((a, b) => {
              return b.price - a.price;
            });
            return newArr;
          });
          break;
        case "low-high":
          setFilteredProducts((prev) => {
            let newArr = [...prev];
            newArr.sort((a, b) => {
              return a.price - b.price;
            });
            return newArr;
          });
          break;
        case "old":
          setFilteredProducts((prev) => {
            let newArr = [...prev];
            newArr.sort((a, b) => {
              return new Date(a._createdAt) - new Date(b._createdAt);
            });
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

  const checkSelectedCategory = (category) => {
    if (selectedCheckboxes.CATEGORIES === "all-categories") {
      return true;
    }
    return selectedCheckboxes.CATEGORIES === category;
  };

  const checkSize = (size) => {
    if (selectedCheckboxes.SIZE === "all-sizes") {
      return true;
    }
    return selectedCheckboxes.SIZE === size;
  };

  const checkPrice = (price) => {
    if (selectedCheckboxes.PRICE === "all-prices") {
      return true;
    } else if (selectedCheckboxes.PRICE === "<1000") {
      return price >= 0 && price <= 1000;
    } else if (selectedCheckboxes.PRICE === "1000-3000") {
      return price >= 1000 && price <= 3000;
    } else if (selectedCheckboxes.PRICE === ">3000") {
      return price >= 3000;
    }
  };

  return (
    <>
      <div className="min-h-screen w-screen">
        <Breadcrumb currentPath="Shop" />

        <div className="w-full flex items-start">
          <div className="hidden md:block md:basis-[20%]">
            <CategorySidebar
              selectedCheckboxes={selectedCheckboxes}
              setSelectedCheckboxes={setSelectedCheckboxes}
            />
          </div>

          <div className="flex-grow w-[80%]">
            <div className="w-full flex justify-between md:justify-end px-1 md:px-4 py-2">
              <button
                className="md:hidden flex items-center gap-x-2 ml-12"
                onClick={() => setFilterSidebar(true)}
              >
                Filter
                <IoIosOptions size={25} />
              </button>

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
                <div className="h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4 py-2">
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                      <Card
                        key={product._id}
                        product={product}
                        productsArray={products}
                        handleOpenProductInfoModal={handleOpenProductInfoModal}
                      />
                    ))
                  ) : (
                    <div className="col-span-3 h-[40rem]">
                      <NoProductFound />
                    </div>
                  )}
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
      <Modal
        isOpen={showProductInfoModal}
        productData={selectedProduct}
        onClose={() => setShowProductInfoModal(false)}
      />
      <Sidebar
        isSidebarOpen={openFilterSidebar}
        setIsSidebarOpen={setFilterSidebar}
        direction="left"
        body={
          <CategorySidebar
            selectedCheckboxes={selectedCheckboxes}
            setSelectedCheckboxes={setSelectedCheckboxes}
          />
        }
      />
    </>
  );
}
