import { useState } from "react";
import { InputField } from "@/components/app-inputfield/app-inputfield";
import { SelectField } from "@/components/app-inputfield/app-selectedfield";
import AppModal from "@/components/app-modal/modal.component";
import SubmitButton from "@/components/Button/Submit-button";

export default function FormStudentAddition({
  handleCloseStudentForm,
  studentAdditionObj,
  id = null,
  data = {},
}) {

  const operationOptions = [
    { label: "Addition", value: "addition" },
    { label: "Subtraction", value: "subtraction" },
    { label: "Multiplication", value: "multiplication" },
    { label: "Division", value: "division" },
  ];

  const studentLevelOptions = Array.from({ length: 9 }, (v, i) => ({
    label: `Level ${i + 1}`,
    value: i + 1,
  }));

  // Function to handle operation type change
  const handleOperationChange = (event) => {
    setSelectedOperation(event.target.value);
  };

  return (
    <AppModal
      key="Add Student Test"
      config={studentAdditionObj}
      component={
        <form>
          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <SelectField
              id="operationType"
              label="Operation Type"
              options={operationOptions}
              onChange={handleOperationChange}
            />
            <SelectField
              id="studentlevel"
              label="Student Level"
              options={studentLevelOptions}
            />
            <InputField
              id="rowdigits"
              label="Row Digits"
              type="number"
              placeholder="Enter number of rows"
            />
            <InputField
              id="columndigits"
              label="Column Digits"
              type="number"
              placeholder="Enter number of columns"
            />
            <InputField
              id="verticaldigits"
              label="Vertical Digits"
              type="number"
              placeholder="Enter vertical number of columns"
            />
            <InputField
              id="totaladdition"
              label="Total Addition"
              type="number"
              placeholder="Enter number of total addition"
            />
          </div>
          <SubmitButton />
        </form>
      }
      onCloseModal={handleCloseStudentForm}
    />
  );
}
