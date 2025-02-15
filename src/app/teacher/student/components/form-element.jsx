import { SelectField } from "@/components/app-inputfield/app-selectedfield";
import SubmitButton from "@/components/Button/Submit-button";
import StatusButton from "@/components/Switchers/StatusButton";
import { get } from "@/service/api";
import { API } from "@/service/constant/api-constant";
import { useEffect, useState } from "react";

export default function FormElementStudent({
  data,
  handleSubmit = async () => {},
  isEditMode = false,
}) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(data);
  const [isPasswordEditable, setIsPasswordEditable] = useState(false);

  useEffect(() => {
    setFormData(data);
    setIsPasswordEditable(false);
  }, [data]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const userTypeOptions = [{ label: "Student", value: "Student" }];

  const handleSubmit2 = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (
      !formData.name ||
      !formData.email ||
      (!isEditMode && !formData.password)
    ) {
      alert("Please fill all required fields.");
      setLoading(false);
      return;
    }

    try {
      const submissionData = isPasswordEditable
        ? formData
        : { ...formData, password: formData.password || undefined };

      await handleSubmit(e, submissionData);
    } catch (error) {
      console.error("Error during submission:", error);
    } finally {
      setLoading(false);
    }
  };

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
        <div>
          <label
            htmlFor="studentlevel"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Student Level
          </label>
          <select
            name="level"
            value={formData.level || ""}
            onChange={handleChange}
            className="p-2 bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white rounded w-full"
            required
          >
            <option value="" disabled>
              Select a level
            </option>
            {[...Array(12)].flatMap((_, i) => [
              <option key={`${i + 1}`} value={`${i + 1}`}>
                Level {i + 1}
              </option>,
              <option key={`${i + 1}A`} value={`${i + 1}A`}>
                Level {i + 1}A
              </option>,
            ])}
          </select>
        </div>
        <div>
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Password
          </label>
          <div className="flex items-center">
            <input
              type="text"
              name="password"
              value={formData.password || ""}
              onChange={handleChange}
              className="p-2 bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white rounded w-full"
              required={!isEditMode || isPasswordEditable}
              placeholder="•••••••••"
              disabled={isEditMode && !isPasswordEditable}
            />
            {isEditMode && !isPasswordEditable && (
              <button
                type="button"
                className="ml-2 px-3 py-1 bg-custom-blue text-white rounded"
                onClick={() => setIsPasswordEditable(true)}
              >
                <span className="text-xl">+</span>
              </button>
            )}
          </div>
        </div>
        <SelectField
          id="userType"
          label="User Type"
          options={userTypeOptions}
          value={formData.user_type || ""}
          onChange={(e) =>
            setFormData({ ...formData, user_type: e.target.value })
          }
          required={true}
        />
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
