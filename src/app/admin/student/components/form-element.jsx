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
  const [teachers, setTeachers] = useState([]);
  const [teacherName, setTeacherName] = useState("");
  const [isPasswordEditable, setIsPasswordEditable] = useState(false);

  useEffect(() => {
    setFormData(data);
    setIsPasswordEditable(false);
    fetchTeachers();
  }, [data]);

  const fetchTeachers = async () => {
    try {
      const response = await get(API.getAllUser);
      if (response.code === 200 && response.data) {
        const filteredTeachers = response.data.filter(
          (user) => user.user_type === "Teacher"
        );
        setTeachers(filteredTeachers);
        if (data.teacherId) {
          const teacher = filteredTeachers.find(
            (teacher) => teacher.id === data.teacherId
          );
          if (teacher) {
            setTeacherName(teacher.name); 
          }
        }
      }
    } catch (error) {
      console.error("Error fetching teachers:", error);
    }
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const userTypeOptions = [
    { label: "Student", value: "Student" },
    { label: "Admin", value: "Admin" },
    { label: "Teacher", value: "Teacher" },
  ];
  const teacherPermissionOptions = [
    { label: "All Permission", value: "AllPermission" },
    { label: "Student create", value: "StudentCreate" },
    { label: "Student delete", value: "StudentDelete" },
    { label: "Student edit", value: "StudentEdit" },
    // { label: "Exam create", value: "ExamCreate" },
    // { label: "Exam delete", value: "ExamDelete" },
    // { label: "Report delete", value: "ReportDelete" },
    // { label: "Report export", value: "ReportExport" },
  ];

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
            Phone number
          </label>
          <div class="relative mt-2">
            <div class="absolute top-2 left-0 flex items-center pl-3">
              <span>+91</span>
              <div class="h-6 border-l border-slate-200 ml-2"></div>
            </div>
            <input
              type="tel"
              name="phone_number"
              value={formData.phone_number || ""}
              onChange={handleChange}
              className="p-2 bg-gray-50 border pr-3 pl-14 border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white rounded w-full"
              placeholder="324-456-2323"
              pattern="[0-9]*"
              inputmode="numeric"
              maxlength="10"
            />
          </div>
        </div>
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
         <SelectField
            id="AllTeacher"
            label="Teacher Name"
            options={teachers.map((teacher) => ({
              label: teacher.name,
              value: teacher.id,
            }))}
            value={formData.teacherId || ""}
            onChange={(e) =>
              setFormData({ ...formData, teacherId: e.target.value })
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
