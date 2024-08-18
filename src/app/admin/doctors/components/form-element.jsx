"use client";
import dynamic from "next/dynamic";
import { Suspense, useCallback, useEffect, useState } from "react";
import ImageUploader from "@/components/ImageUploader/ImageUploader";
import SwitcherOne from "@/components/Switchers/SwitcherOne";
import { toast } from "react-toastify";
import Loader from "@/components/common/Loader";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import { get } from "@/service/api";
import { API } from "@/service/constant/api-constant";
import StarRatings from "react-star-ratings";

const EditorComp = dynamic(
  () => import("../../../../components/app-mdxEditor/editor"),
  { ssr: false }
);

export default function FormElementStudent() {
  return (
    <>
      {loading && (
        <div className="fixed top-0 left-0 bottom-0 right-0 z-50 w-full h-full bg-black/50">
          <Loader />
        </div>
      )}

      <div className="rounded-xl border border-stroke bg-white p-2 shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="px-4 mb-4">
          <span>
            <p className="text-xl font-bold text-black dark:text-white py-3">
              Add New Student
            </p>
          </span>
        </div>
        <form className="space-y-4">
          <div className="flex space-x-2">
            <div className="w-1/2">
              <label
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                htmlFor="name"
              >
                Name
              </label>
              <input
                className="p-2 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white rounded w-full"
                type="text"
                name="name"
                placeholder="Name"
                required
              />
            </div>
          </div>
          <div className="flex space-x-2">
            <div className="w-1/3">
              <label
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                htmlFor="city"
              >
              Email
              </label>
              <input
                className="p-2 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white rounded w-full"
                type="email"
                name="Email"
                placeholder="Email"
                required
              />
            </div>
          </div>
          <div className="flex space-x-2">
            <div className="w-1/2">
              <label
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                htmlFor="surgerieCount"
              >
                SurgerieCount
              </label>
              <input
                className="p-2 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white rounded w-full"
                type="number"
                name="surgerieCount"
                value={formData.surgerieCount}
                onChange={(e) =>
                  setFormData({ ...formData, surgerieCount: e.target.value })
                }
                placeholder="SurgerieCount"
                required
              />
            </div>
            <div className="w-1/2">
              <label
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                htmlFor="treatmentCount"
              >
                TreatmentCount
              </label>
              <input
                className="p-2 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white rounded w-full"
                type="number"
                name="treatmentCount"
                value={formData.treatmentCount}
                onChange={(e) =>
                  setFormData({ ...formData, treatmentCount: e.target.value })
                }
                placeholder="TreatmentCount"
                required
              />
            </div>
          </div>

          <div className="flex space-x-2">
            <div className="w-1/2">
              <div className="mb-6">
                <label
                  htmlFor="imageuploader"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Upload Doctor Image
                </label>
                <ImageUploader
                  labelName="ImageupLoaderDoctor"
                  multiple={false}
                  defaultImages={formData.doctorImage || []}
                  maxImageSize={{ width: 317, height: 350 }}
                  clear={clearPreviews}
                  handleImageChange={(e) =>
                    setFormData((oldData) => ({ ...oldData, doctorImage: e }))
                  }
                />
              </div>
            </div>
            <div className="w-1/2">
              <div className="mb-6">
                <label
                  htmlFor="imageuploader"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Achievement Image
                </label>
                <ImageUploader
                  labelName="ImageupLoaderAchievement"
                  multiple={true}
                  defaultImages={formData.achievementImage || []}
                  maxImageSize={{ width: 240, height: 260 }}
                  clear={clearPreviews}
                  handleImageChange={(e) =>
                    setFormData((oldData) => ({
                      ...oldData,
                      achievementImage: e,
                    }))
                  }
                />
              </div>
            </div>
          </div>
          <div className="flex space-x-2">
            <div className="w-1/2">
              <label
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                htmlFor="ratingOrder"
              >
                Rating
              </label>
              <StarRatings
                rating={formData.ratingOrder || 0}
                starHoverColor="#1F2B6C"
                starRatedColor="#1F2B6C"
                changeRating={handleRatingChange}
                numberOfStars={5}
                name="ratingOrder"
                starDimension="25px"
                starSpacing="5px"
              />
            </div>
            <div className="w-1/2 flex justify-end items-center space-x-3">
              <label
                htmlFor="home_page"
                className="block text-sm font-medium text-gray-900 dark:text-white"
              >
                Show at Home Page
              </label>
              <SwitcherOne
                value={formData.is_home}
                onValueChange={(value) =>
                  setFormData({ ...formData, is_home: value })
                }
                defaultChecked={formData.is_home}
              />
            </div>
          </div>

          <div className="flex justify-end py-5">
            <button
              className="border-2 bg-custom-bg text-custom-blue font-bold py-2 px-5 rounded-full flex items-center"
              type="submit"
              disabled={loading}
            >
              <h1>{loading ? "Submitting..." : "Submit"}</h1>
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
