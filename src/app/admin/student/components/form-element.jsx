import SubmitButton from "@/components/Button/Submit-button";
import ImageUploader from "@/components/ImageUploader/ImageUploader";

export default function FormElementStudent() {
  return (
    <>
      <form>
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <div>
            <label
              for="first_name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Full Name
            </label>
            <input
              type="text"
              id="first_name"
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
              className="p-2 bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white rounded w-full"
              placeholder="123-45-678"
              pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
              required
            />
          </div>
          <div>
            <label
              for="standerd"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Standard
            </label>
            <input
              type="text"
              id="standerd"
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
              className="p-2 bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white rounded w-full"
              placeholder="•••••••••"
              required
            />
          </div>
          <div>
            <label
              for="confirm_password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Confirm password
            </label>
            <input
              type="password"
              id="confirm_password"
              className="p-2 bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white rounded w-full"
              placeholder="•••••••••"
              required
            />
          </div>
          <div>
            <label
              for="address"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Address
            </label>
            <textarea
              type="text"
              id="address"
              rows="7"
              className="p-2 bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white rounded w-full"
              placeholder="Write your address here..."
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
        </div>
        <SubmitButton/>
      </form>
    </>
  );
}
