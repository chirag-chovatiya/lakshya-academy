import React, { useEffect, useState } from "react";

export default function ImageUploader({
  labelName = "imageUploader",
  handleImageChange = null,
  multiple = true,
  defaultImages = [],
  clear = false,
  maxImageSize={}
}) {
  const [imagePreviews, setImagePreviews] = useState([]);

  useEffect(() => {
    setImagePreviews([]);
  }, [clear])

  useEffect(() => {
    if (!defaultImages.length) return;
    setImagePreviews(typeof defaultImages === "string" ? [defaultImages] : defaultImages);
  }, [defaultImages])

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);

    const formData = new FormData();
    Promise.all(
      files.map((file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = (e) => {
            formData.append("files", file, file.name.replace(" ", "_"));
            resolve(e.target.result);
          };
          reader.onerror = (error) => reject(error);
        });
      })
    ).then(async (images) => {
      setImagePreviews(multiple ? [...imagePreviews, ...images] : [...images]);

      // const { urls } = await post(API.imgUpload, formData, true);
      // console.log(urls);
      // handleImageChange ? handleImageChange(urls) : "";
    });
  };
  return (
    <div className="flex flex-col items-center justify-center w-full">
      {(!(imagePreviews && imagePreviews.length > 0 && !multiple && imagePreviews[0]) || (multiple)) && <label
        htmlFor={labelName}
        className="flex flex-col items-center justify-center w-full h-auto border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <i className="fa-solid fa-images text-[35px] mb-4"></i>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="py-2 text-xs text-gray-500 dark:text-gray-400 text-center">
              SVG, PNG, JPG or GIF ({multiple ? "No limit" : "1 Image"})
              <br />
            </p>
            <p className="text-base text-gray-500 dark:text-gray-400 text-center">
            {`${maxImageSize.width} X ${maxImageSize.height} pixels.`}
            </p>
          </div>
        <input
          id={labelName}
          type="file"
          className="hidden"
          multiple={multiple}
          onChange={handleFileChange}
        />
      </label>}
      <div className="flex flex-wrap justify-center mt-4">
        {imagePreviews.map((preview, index) => (
          <div key={index} className="m-2 relative dark:rounded-md dark:bg-gray-200">
            <img
              src={preview}
              alt={`Preview ${index}`}
              className="h-24 object-cover rounded-lg"
            />
            <button
              type="button"
              className="absolute top-0 right-0 bg-red-500 text-white bg-[#50399c] rounded-full text-[15px] p-1 flex items-center justify-center"
              onClick={() => {
                const updatedPreviews = [...imagePreviews];
                updatedPreviews.splice(index, 1);
                setImagePreviews(updatedPreviews);
                console.log(updatedPreviews);
              }}
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}