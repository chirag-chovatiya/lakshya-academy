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
    horizontalDigits: null,
    verticalDigits: null,
    totalQuestion: null,
    question: [],
    level: 0,
    type: "",
    subDigits: null,
  },
}) {
  const [formData, setFormData] = useState(data);
  const [loading, setLoading] = useState(false);

  const { initialize } =
    useTestAdminStore((state) => state);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await post(API.getAllTest, formData);
      if (response.code === 201 || response.code === 200) {
        toast.success("Form submitted successfully!");
        handleCloseStudentForm()
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
            <div className="grid gap-6 mb-6 md:grid-cols-2">
              <SelectField
                id="operationType"
                label="Operation Type"
                options={[
                  { label: "Addition", value: "addition" },
                  { label: "Subtraction", value: "subtraction" },
                  { label: "Multiplication", value: "multiplication" },
                  { label: "Division", value: "division" },
                ]}
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
              />
              <SelectField
                id="studentLevel"
                label="Student Level"
                options={Array.from({ length: 9 }, (_, i) => ({
                  label: `Level ${i + 1}`,
                  value: i + 1,
                }))}
                name="level"
                value={formData.level}
                onChange={handleChange}
                required
              />
              <InputField
                id="rowDigits"
                label="Row Digits For (A, S, M, D)"
                type="number"
                name="horizontalDigits"
                value={formData.horizontalDigits}
                onChange={handleChange}
                placeholder="Enter number of rows"
                required
              />
              <InputField
                id="colDigits"
                label="Column Digits Only For (Addition)"
                type="number"
                name="verticalDigits"
                value={formData.verticalDigits}
                onChange={handleChange}
                placeholder="Enter number of columns"
              />
              <InputField
                id="subDigits"
                label="Sub Digits Only For (S, M, D)"
                type="number"
                name="subDigits"
                value={formData.subDigits}
                onChange={handleChange}
                placeholder="Enter sub digits"
              />
              <InputField
                id="totalQuestion"
                label="Total Question"
                type="number"
                name="totalQuestion"
                value={formData.totalQuestion}
                onChange={handleChange}
                placeholder="Enter number of total question"
                required
              />
            </div>
            <SubmitButton loading={loading} />
          </form>
        </>
      }
      onCloseModal={handleCloseStudentForm}
    ></AppModal>
  );
}
