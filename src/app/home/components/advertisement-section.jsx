"use client";
import { getAdvertisementById } from "@/service/advertisement-api";
import React, { useEffect, useState } from "react";

export default function AdminAdvertisement() {
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = 1;
        const response = await getAdvertisementById(id);
        const { data } = response;
        setFormData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to fetch data.");
      }
    };

    fetchData();
  }, []);
  return (
    formData?.status ? (
      <div className="block w-full h-full p-3  bg-white border border-custom-blue shadow overflow-hidden">
        <h5 className="text-xl font-bold tracking-tight text-gray-900 whitespace-nowrap animate-marquee">
          {formData?.description}
        </h5>
      </div>
    ) : null
  );
}
