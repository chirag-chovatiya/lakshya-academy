import { SelectField } from "@/components/app-inputfield/app-selectedfield";
import SubmitButton from "@/components/Button/Submit-button";
import ImageUploader from "@/components/ImageUploader/ImageUploader";
import StatusButton from "@/components/Switchers/StatusButton";
import { useEffect, useState } from "react";

export default function FormElementStudent({
  data,
  handleSubmit = async () => {},
}) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(data);

  useEffect(() => setFormData(data), [data]);

  const handleSubmit2 = async (e) => {
    setLoading(true);
    await handleSubmit(e, formData);
    setLoading(false);
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const operationOptions = [
    { label: "Student", value: "Student" },
    { label: "Admin", value: "Admin" },
    { label: "Teacher", value: "Teacher" },
  ];

  return (
    <form onSubmit={handleSubmit2}>
      <div className="grid gap-6 mb-6 md:grid-cols-2">
        {[
          {
            label: "Full Name",
            name: "name",
            type: "text",
            placeholder: "John",
          },
          {
            label: "Email address",
            name: "email",
            type: "email",
            placeholder: "john.doe@company.com",
          },
          {
            label: "Phone number",
            name: "phone_number",
            type: "tel",
            placeholder: "123-45-678",
          },
          {
            label: "Student Level",
            name: "level",
            type: "text",
            placeholder: "Flowbite",
          },
          {
            label: "Password",
            name: "password",
            type: "text",
            placeholder: "•••••••••",
          },
        ].map((input, idx) => (
          <div key={idx}>
            <label
              htmlFor={input.name}
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              {input.label}
            </label>
            <input
              {...input}
              value={formData[input.name] || ""}
              onChange={handleChange}
              className="p-2 bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white rounded w-full"
              required
            />
          </div>
        ))}
        <SelectField
            id="operationType"
            label="Account Type"
            options={operationOptions}
            value={formData.user_type || ""}
            onChange={(value) =>
              setFormData({ ...formData, operationType: value })
            }
          />
        <div>
          <label
            htmlFor="studentimage"
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
            htmlFor="status"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Status
          </label>
          <StatusButton
            value={formData.status}
            onValueChange={(value) =>
              setFormData({ ...formData, status: value })
            }
            defaultChecked={formData.status}
          />
        </div>
      </div>
      <SubmitButton loading={loading} />
    </form>
  );
}
