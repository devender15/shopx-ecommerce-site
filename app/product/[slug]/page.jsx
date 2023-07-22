"use client";

import { useState, useEffect } from "react";
import { client } from "@lib/client";
import { Breadcrumb, AddToCart, Badge } from "@components";
import { IoExpand } from "react-icons/io5";
import { urlFor } from "@lib/client";
import Image from "next/image";
import { TailSpin } from "react-loader-spinner";
import Lightbox from "react-awesome-lightbox";
import "react-awesome-lightbox/build/style.css";

export default function Page({ params }) {
  const [product, setProduct] = useState({});
  const [productImages, setProductImages] = useState([]);
  const [mainImage, setMainImage] = useState(null);
  const slug = params?.slug;

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await client.fetch(
        `*[_type == 'product' && slug.current == '${slug}'][0]`
      );
      setProduct(response);
    };
    fetchProduct();
  }, [slug]);

  useEffect(() => {
    const getProductImages = () => {
      if (product?.image) {
        const images = product?.image.map((image) =>
          urlFor(image?.asset?._ref).url()
        );
        setProductImages(images);
        setMainImage(images[0]);
      }
    };
    getProductImages();
  }, [product]);

  const handleImageChange = (image) => {
    setMainImage(image);
  };

  return (
    <div className="min-h-screen w-full pb-14">
      <Breadcrumb currentPath="Shop Product" />

      <Lightbox images={productImages} />

      <section className="flex items-start gap-x-14 w-[75%] mx-auto mt-20">
        <aside className="flex flex-col gap-y-4 basis-1/2">
          <div className="relative w-full h-[40rem] bg-[#f6f6f6]">
            {mainImage ? (
              <Image
                src={mainImage}
                width={300}
                height={800}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex justify-center items-center w-full h-full">
                <TailSpin color="gray" height={50} width={50} />
              </div>
            )}

            <div className="absolute top-4 left-4 flex flex-col gap-y-3">
              {product?.discount && (
                <Badge text={`${product?.discount}%`} type="discount" />
              )}

              {product?.isNew && <Badge text="New" type="new" />}
            </div>

            <div className="absolute top-4 right-4">
              <button>
                <IoExpand fontSize={30} title="View Image" />
              </button>
            </div>
          </div>

          <div className="w-full mt-5 overflow-x-auto flex items-center gap-x-4 hidescroll">
            {productImages?.map((image, index) => (
              <div className="h-28 w-24">
                <Image
                  src={image}
                  key={index}
                  width={85}
                  height={85}
                  alt="more"
                  onMouseOver={() => handleImageChange(image)}
                  onClick={() => handleImageChange(image)}
                  className="cursor-pointer h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </aside>

        <aside className="basis-1/2 px-4 h-full flex flex-col gap-y-4">
          <h1 className="text-2xl font-semibold">{product?.name}</h1>
          <p className="text-xl text-red-500 font-semibold">
            ₹ {product?.price?.toLocaleString()}
          </p>
          <p className="text-base font-medium">{product?.description}</p>

          <hr className="my-6" />
          <AddToCart productData={product} />
        </aside>
      </section>
    </div>
  );
}
