"use client";
import React, { useState } from "react";
import { InputField } from "@/components/app-inputfield/app-inputfield";
import { SelectField } from "@/components/app-inputfield/app-selectedfield";
import AppModal from "@/components/app-modal/modal.component";
import SubmitButton from "@/components/Button/Submit-button";
import { post } from "@/service/api";
import { API } from "@/service/constant/api-constant";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTestAdminStore } from "@/providers/test-store-provider";

export default function FormStudentAddition({
  handleCloseStudentForm,
  studentAdditionObj,
  data = {
    level: 0,
    totalQuestion: 0,
    additionSettings: {
      horizontalDigits: 0,
      verticalDigits: 0,
      totalQuestion: 0,
    },
    subtractionSettings: {
      horizontalDigits: 0,
      subDigits: 0,
      totalQuestion: 0,
    },
    multiplicationSettings: {
      horizontalDigits: 0,
      subDigits: 0,
      totalQuestion: 0,
    },
    divisionSettings: {
      horizontalDigits: 0,
      subDigits: 0,
      totalQuestion: 0,
      pointFlag: false,
    },
  },
}) {
  const [formData, setFormData] = useState(data);
  const [loading, setLoading] = useState(false);
  const [visibleFields, setVisibleFields] = useState([]);

  const { initialize } = useTestAdminStore((state) => state);

  const handleToggleField = (type) => {
    setVisibleFields((prev) =>
      prev.includes(type)
        ? prev.filter((item) => item !== type)
        : [...prev, type]
    );
  };

  const handleChange = (e, type) => {
    const { name, value } = e.target;
    let parsedValue = value === "" ? "" : parseInt(value);
    if (name !== "totalQuestion") {
      if (parsedValue < 0) parsedValue = 0;
      if (parsedValue > 10) parsedValue = 10;
    }
    setFormData((prevData) => ({
      ...prevData,
      [`${type}Settings`]: {
        ...prevData[`${type}Settings`],
        [name]: parsedValue,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await post(API.getAllTest, formData);
      if (response.code === 201 || response.code === 200) {
        toast.success("Form submitted successfully!");
        handleCloseStudentForm();
        initialize();
      } else {
        toast.error("Failed to submit form.");
      }
    } catch (error) {
      console.error("There was an error submitting the form:", error);
      toast.error("There was an error submitting the form.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppModal
      key="Add Student Test"
      config={studentAdditionObj}
      component={
        <>
          <ToastContainer />
          <form onSubmit={handleSubmit}>
            <div className="grid mb-6 md:grid-cols-1">
              <SelectField
                id="studentLevel"
                label="Student Level"
                required={true}
                options={Array.from({ length: 12 }, (_, i) => ({
                  label: `Level ${i + 1}`,
                  value: i + 1,
                }))}
                name="level"
                value={formData.level}
                onChange={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    level: e.target.value,
                  }))
                }
              />
            </div>

            <div className="grid gap-6 mb-6 md:grid-cols-2">
              {["addition", "subtraction", "multiplication", "division"].map(
                (type) => (
                  <div key={type}>
                    <div className="flex items-center justify-between">
                      <label className="text-gray-700 capitalize">{type}</label>
                      <button
                        type="button"
                        onClick={() => handleToggleField(type)}
                        className="bg-custom-blue text-white px-2 py-1 rounded"
                      >
                        {visibleFields.includes(type) ? "Remove" : "Add"} +
                      </button>
                    </div>
                    {visibleFields.includes(type) && (
                      <div className="mt-4 grid gap-4">
                        <InputField
                          id={`${type}RowDigits`}
                          label={`Row Digits For ${type}`}
                          type="number"
                          required={true}
                          name="horizontalDigits"
                          value={formData[`${type}Settings`].horizontalDigits}
                          onChange={(e) => handleChange(e, type)}
                          placeholder="Enter number of rows"
                          min="0"
                          max="10"
                        />
                        {type === "addition" && (
                          <InputField
                            id={`${type}ColDigits`}
                            label={`Column Digits For ${type}`}
                            type="number"
                            name="verticalDigits"
                            value={formData[`${type}Settings`].verticalDigits}
                            onChange={(e) => handleChange(e, type)}
                            placeholder="Enter number of columns"
                            min="0"
                            max="10"
                          />
                        )}
                        {(type === "subtraction" ||
                          type === "multiplication" ||
                          type === "division") && (
                          <InputField
                            id={`${type}SubDigits`}
                            label={`Sub Digits For ${type}`}
                            type="number"
                            name="subDigits"
                            value={formData[`${type}Settings`].subDigits}
                            onChange={(e) => handleChange(e, type)}
                            placeholder="Enter sub digits"
                            min="0"
                            max="10"
                          />
                        )}
                        <InputField
                          id={`${type}TotalQuestion`}
                          label={`Total Questions For ${type}`}
                          type="number"
                          name="totalQuestion"
                          value={formData[`${type}Settings`].totalQuestion}
                          onChange={(e) => handleChange(e, type)}
                          placeholder="Enter total questions"
                          required
                        />
                        {type === "division" && (
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              id={`${type}PointFlag`}
                              name="pointFlag"
                              checked={
                                formData[`${type}Settings`].pointFlag
                              }
                              onChange={(e) =>
                                setFormData((prevData) => ({
                                  ...prevData,
                                  [`${type}Settings`]: {
                                    ...prevData[`${type}Settings`],
                                    pointFlag: e.target.checked,
                                  },
                                }))
                              }
                              className="mr-2"
                            />
                            <label
                              htmlFor={`${type}PointFlag`}
                              className="text-gray-700"
                            >
                              Include points in division
                            </label>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )
              )}
            </div>

            <SubmitButton loading={loading} />
          </form>
        </>
      }
      onCloseModal={handleCloseStudentForm}
    />
  );
}
