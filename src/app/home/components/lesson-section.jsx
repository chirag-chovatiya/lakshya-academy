"use client";
import { get } from "@/service/api";
import { API } from "@/service/constant/api-constant";
import React, { useEffect, useState } from "react";

export default function StudentLesson() {
  const [lessonData, setLessonData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await get(API.stdLesson);
        if (
          response.code === 200 &&
          response.data &&
          response.data.length > 0 &&
          response.data[0].status
        ) {
          setLessonData(response.data[0]);
        }
      } catch (error) {
        console.error("Failed to fetch lesson data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {lessonData && (
        <div className="block w-full h-full p-6 bg-white border border-gray-200 rounded-lg shadow">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
            Student Weekly Home Work
          </h5>
          <p className="font-normal text-gray-700">{lessonData.description}</p>
        </div>
      )}
    </>
  );
}
