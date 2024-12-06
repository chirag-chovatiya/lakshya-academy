import { SelectField } from "@/components/app-inputfield/app-selectedfield";
import SubmitButton from "@/components/Button/Submit-button";
import StatusButton from "@/components/Switchers/StatusButton";
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

  const userTypeOptions = [
    { label: "Student", value: "Student" },
    { label: "Admin", value: "Admin" },
    { label: "Teacher", value: "Teacher" },
  ];
  const teacherPermissionOptions = [
    { label: "Student create", value: "StudentCreate" },
    { label: "Student delete", value: "StudentDelete" },
    { label: "Student edit", value: "StudentEdit" },
    { label: "Exam create", value: "ExamCreate" },
    { label: "Exam delete", value: "ExamDelete" },
    { label: "Report delete", value: "ReportDelete" },
    { label: "Report export", value: "ReportExport" },
  ];

  const handleSubmit2 = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.name || !formData.email || !formData.password) {
      alert("Please fill all required fields.");
      setLoading(false);
      return;
    }
  
    try {
      const submissionData = isPasswordEditable
        ? formData
        : { ...formData, password: undefined };

      await handleSubmit(e, submissionData);
    } catch (error) {
      console.error("Error during submission:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePermissionChange = (e) => {
    const selectedOptions = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setFormData((prevFormData) => ({
      ...prevFormData,
      teacher_permission: Array.isArray(prevFormData.teacher_permission)
        ? [...new Set([...prevFormData.teacher_permission, ...selectedOptions])]
        : selectedOptions,
    }));
  };

  const handleRemovePermission = (permissionToRemove) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      teacher_permission: Array.isArray(prevFormData.teacher_permission)
        ? prevFormData.teacher_permission.filter(
            (permission) => permission !== permissionToRemove
          )
        : [],
    }));
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
          <input
            type="number"
            name="level"
            value={formData.level || ""}
            onChange={handleChange}
            className="p-2 bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white rounded w-full"
            placeholder="Student Level"
          />
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
              required={!isEditMode || isPasswordEditable} // Required only in create mode or when editing
              placeholder="•••••••••"
              disabled={isEditMode && !isPasswordEditable} // Editable only in edit mode
            />
            {isEditMode && !isPasswordEditable && ( // Show button only in edit mode
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
        />
        <div>
          <SelectField
            id="teacher_permission"
            label="Teacher Permission"
            options={teacherPermissionOptions}
            value={formData.teacher_permission || []}
            onChange={handlePermissionChange}
          />
          <div className="flex flex-wrap gap-2 mt-2">
            {(Array.isArray(formData.teacher_permission)
              ? formData.teacher_permission
              : []
            ).map((permission, index) => (
              <div
                key={index}
                className="flex items-center bg-gray-200 dark:bg-gray-700 text-sm px-3 py-1 rounded-full"
              >
                {permission}
                <button
                  type="button"
                  onClick={() => handleRemovePermission(permission)}
                  className="ml-2 text-red-500 hover:text-red-700"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
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
