import SubmitButton from "@/components/Button/Submit-button";
import ImageUploader from "@/components/ImageUploader/ImageUploader";
import StatusButton from "@/components/Switchers/StatusButton";
import { useEffect, useState } from "react";

export default function FormElementStudent(
  {data,
  handleSubmit = async () => {}}
) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(data);

  useEffect(() => {
    console.log(data);
    setFormData(data);
  }, [data]);

  const handleSubmit2 = async (e) => {
    setLoading(true);
    await handleSubmit(e, formData);
    setLoading(false);
  };
  return (
    <>
      <form onSubmit={handleSubmit2}>
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <div>
            <label
              for="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="p-2 bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white rounded w-full"
              placeholder="John"
              required
            />
          </div>
          <div>
            <label
              for="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Email address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="p-2 bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white rounded w-full"
              placeholder="john.doe@company.com"
              required
            />
          </div>
          <div>
            <label
              for="phone"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Phone number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone_number"
              value={formData.phone_number}
              onChange={(e) =>
                setFormData({ ...formData, phone_number: e.target.value })
              }
              className="p-2 bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white rounded w-full"
              placeholder="123-45-678"
              required
            />
          </div>
          <div>
            <label
              for="level"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Student Level
            </label>
            <input
              type="text"
              id="level"
              name="level"
              value={formData.level}
              onChange={(e) =>
                setFormData({ ...formData, level: e.target.value })
              }
              className="p-2 bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white rounded w-full"
              placeholder="Flowbite"
              required
            />
          </div>
          <div>
            <label
              for="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="p-2 bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white rounded w-full"
              placeholder="•••••••••"
              required
            />
          </div>
          <div>
            <label
              for="studentimage"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Upload Student Image
            </label>
            <ImageUploader
              labelName="ImageupLoaderBlog"
              multiple={false}
              maxImageSize={{ width: 1365, height: 250 }}
            />
          </div>
          <div>
            <label
              for="address"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Status
            </label>
            <StatusButton/>
          </div>
        </div>
        <SubmitButton />
      </form>
    </>
  );
}
