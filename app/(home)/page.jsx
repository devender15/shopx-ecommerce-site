"use client";

import { useState, useEffect } from "react";
import { client } from "@lib/client";
import { SERVICES } from "@constants";
import { TailSpin } from "react-loader-spinner";
import { useStateContext } from "@context/StateContext";
import { useSession } from "next-auth/react";

import { Banner, Heading, Modal, CategoriesView } from "@components";

export default function Page() {
  const { handleOpenProductInfoModal, selectedProduct, setShowProductInfoModal, showProductInfoModal } = useStateContext();
  const [bannerData, setBannerData] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { data: session } = useSession();

  console.log("session: ", session);

  useEffect(() => {
    const fetchBanners = async () => {
      const banners = await client.fetch(`*[_type == 'featuredPosts']`);
      setBannerData(banners);
    };

    const fetchProducts = async () => {
      setIsLoading(true);
      const products_response = await client.fetch(`*[_type == 'product']`);
      setIsLoading(false);
      setProducts(products_response);
    };

    fetchBanners();
    fetchProducts();
  }, []);

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

  return (
    <>
      <Banner data={bannerData} />

      <div className="px-3 w-full">
        <section className="mt-14 w-full flex flex-col gap-y-8 md:flex-row md:justify-center md:gap-y-0 md:gap-x-8">
          {SERVICES.map((service) => (
            <div className="flex items-center gap-x-4" key={service.id}>
              <span>{service.icon}</span>

              <div className="flex flex-col items-start gap-y-1">
                <span className="text-lg font-semibold">{service.name}</span>
                <span className="text-base text-gray-500">
                  {service.description}
                </span>
              </div>
            </div>
          ))}
        </section>

        <section className="my-14">
          <Heading text="Daily Deals!" />

          <div className="mt-10">
            {isLoading ? (
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
              <CategoriesView products={products} handleOpenProductInfoModal={handleOpenProductInfoModal} />
            )}
          </div>
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
