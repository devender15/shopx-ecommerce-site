"use client";

import { useState, useEffect } from "react";
import { client } from "@lib/client";
import Banner from "@components/Banner";

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
    <div className="h-[90vh] w-full overflow-hidden">
      <div className="h-full w-full">
        <Banner data={bannerData} />
      </div>
    </div>
  );
}
