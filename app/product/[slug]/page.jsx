"use client";

import { useState, useEffect } from "react";
import { client } from "@lib/client";
import {
  Breadcrumb,
  AddToCart,
  Badge,
  ImageViewer,
  RelatedProducts,
  Modal,
} from "@components";
import { IoExpand } from "react-icons/io5";
import { urlFor } from "@lib/client";
import Image from "next/image";
import { TailSpin } from "react-loader-spinner";

export default function Page({ params }) {
  const [product, setProduct] = useState({});
  const [productImages, setProductImages] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [mainImage, setMainImage] = useState(null);
  const [showImageViewer, setShowImageViewer] = useState(false);
  const [showProductInfoModal, setShowProductInfoModal] = useState(false);
  const slug = params?.slug;

  // disabling the body scroll when modal is open
  useEffect(() => {
    const disableBodyScroll = () => {
      if (showProductInfoModal) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "unset";
      }
    };
    disableBodyScroll();
  }, [showProductInfoModal]);

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

    const relatedProducts = async () => {
      const response = await client.fetch(
        `*[_type == 'product' && _id != '${product?._id}' && subCategory == '${product?.subCategory}'][0..3]`
      );
      setRelatedProducts(response);
    };

    getProductImages();
    relatedProducts();
  }, [product]);

  const handleImageChange = (image) => {
    setMainImage(image);
  };

  const handleShowImageViewer = () => {
    setShowImageViewer(true);
  };

  const handleCloseImageViewer = () => {
    setShowImageViewer(false);
  };

  const handleOpenProductInfoModal = (productId) => {
    const product = relatedProducts.find(
      (product) => product._id === productId
    );
    setSelectedProduct(product);

    setShowProductInfoModal(true);
  };

  return (
    <>
      <div className="min-h-screen w-full pb-14">
        <Breadcrumb currentPath="Shop Product" />
        <section className="flex flex-col items-center md:flex-row md:items-start gap-x-14 md:w-[85%] w-full xl:w-[75%] mx-auto mt-20">
          <aside className="flex flex-col gap-y-4 basis-1/2 w-[95%]">
            <div className="relative w-full h-[32rem] lg:h-[35rem] flex justify-center items-center bg-[#f6f6f6]">
              <div className="h-[80%]">
                {mainImage ? (
                  <Image
                    src={mainImage}
                    alt="main"
                    width={300}
                    height={800}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex justify-center items-center w-full h-full">
                    <TailSpin color="gray" height={50} width={50} />
                  </div>
                )}
              </div>

              <div className="absolute top-4 left-4 flex flex-col gap-y-3">
                {product?.discount && (
                  <Badge text={`${product?.discount}%`} type="discount" />
                )}

                {product?.isNew && <Badge text="New" type="new" />}
              </div>

              <div className="absolute top-4 right-4">
                <button onClick={handleShowImageViewer}>
                  <IoExpand fontSize={30} title="View Image" />
                </button>
              </div>
            </div>

            <div className="w-full mt-3 overflow-x-auto flex items-center gap-x-2 hidescroll">
              {productImages?.map((image, index) => (
                <div className="h-24 lg:h-28 w-20 lg:w-24 p-3 bg-[#f6f6f6]">
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

          <aside className="basis-1/2 px-4 h-full flex flex-col items-start gap-y-4 w-[95%] mt-6 md:mt-0">
            <h1 className="text-xl lg:text-2xl font-semibold">
              {product?.name}
            </h1>
            <p className="text-lg lg:text-xl text-red-500 font-semibold">
              ₹ {product?.price?.toLocaleString()}
            </p>
            <p className="text-base font-medium">{product?.description}</p>

            <hr className="my-6" />
            <AddToCart productData={product} />
          </aside>
        </section>

        <section className="w-full md:w-[85%] xl:w-[75%] mx-auto mt-20">
          <RelatedProducts
            relatedProducts={relatedProducts}
            handleOpenProductInfoModal={handleOpenProductInfoModal}
          />
        </section>
      </div>
      {showImageViewer && (
        <ImageViewer
          images={productImages}
          handleCloseImageViewer={handleCloseImageViewer}
        />
      )}
      <Modal
        isOpen={showProductInfoModal}
        productData={selectedProduct}
        onClose={() => setShowProductInfoModal(false)}
      />
    </>
  );
}
