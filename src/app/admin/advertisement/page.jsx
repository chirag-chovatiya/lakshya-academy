"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import React, { useEffect, useState } from "react";
import { TextAreaField } from "@/components/app-inputfield/app-textarea";
import StatusButton from "@/components/Switchers/StatusButton";
import { getAdvertisementById, updateAdvertisementById } from "@/service/notice-api";
import { toast, ToastContainer } from "react-toastify";

export default function SatisfiedClientInfo() {
  const [formData, setFormData] = useState({
    description: "",
    status: true,
  });
  const [loading, setLoading] = useState(false);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const id = 1;
      const data = await updateAdvertisementById(id, formData);
      console.log(data)
      toast.success("Data updated successfully!");
    } catch (error) {
      console.error("Error updating data:", error);
      toast.error("Failed to update data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-270">
      <Breadcrumb pageName="Advertisement" />
      <div className="grid grid-cols-5">
        <div className="col-span-5 xl:col-span-12">
          <div className="rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="p-7">
              <form onSubmit={handleSubmit}>
              {/* <form> */}
                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                  <div className="w-full">
                    <TextAreaField
                      id="desc"
                      label="Advertisement Description"
                      type="text"
                      required={true}
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Enter Advertisement Description"
                    />
                  </div>
                </div>
                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                  <div className="w-full sm:w-1/2">
                    <StatusButton
                    value={formData.status}
                    onValueChange={(value) =>
                      setFormData({ ...formData, status: value })
                    }
                    defaultChecked={formData.status}
                    />
                  </div>

                  <div className="w-full sm:w-1/2">
                    <div className="flex justify-end gap-4.5">
                      <button
                        className="flex justify-center rounded border border-stroke px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                        type="button"
                        onClick={() => window.history.back()}
                      >
                        Cancel
                      </button>
                      <button
                        className="flex justify-center rounded bg-custom-blue px-6 py-2 font-medium text-white"
                        type="submit"
                        disabled={loading}
                      >
                        {loading ? "Saving..." : "Save"}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
              {/* <ToastContainer /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
