"use client";

import { useState, useEffect } from "react";
import { client } from "@lib/client";
import Banner from "@components/Banner";
import { SERVICES } from "@constants";
import Heading from "@components/Heading";
import Card from "@components/Card";

export default function Page() {
  const [bannerData, setBannerData] = useState([]);

  useEffect(() => {
    const fetchBanners = async () => {
      const banners = await client.fetch(`*[_type == 'featuredPosts']`);
      setBannerData(banners);
    };
    fetchBanners();
  }, []);

  return (
    <>
      <Banner data={bannerData} />

      <div className="px-3 w-full">

        <section className="mt-14 w-full flex flex-col gap-y-8 md:flex-row md:justify-center md:gap-y-0 md:gap-x-8">
          {SERVICES.map((service) => (
            <div className="flex items-center gap-x-4" key={service.id}>
              <span>
                {service.icon}
              </span>

              <div className="flex flex-col items-start gap-y-1">
                <span className="text-lg font-semibold">{service.name}</span>
                <span className="text-base text-gray-500">
                  {service.description}
                </span>
              </div>
            </div>
          ))}
        </section>

        <section className="mt-14">
            <Heading text="Daily Deals!" />

            <div className="mt-10">
              <Card />
            </div>
        </section>

      </div>
    </>
  );
}
