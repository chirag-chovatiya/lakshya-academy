import { InputField } from "@/components/app-inputfield/app-inputfield";
import AppModal from "@/components/app-modal/modal.component";
import SubmitButton from "@/components/Button/Submit-button";

export default function FormStudentAddition({
  handleCloseStudentForm,
  studentAdditionObj,
  id = null,
  data = {},
}) {
  return (
    <AppModal
      key="Add Student Addition"
      config={studentAdditionObj}
      component={
        <form>
          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <InputField
              id="studentlevel"
              label="Student Level"
              type="number"
              placeholder="Select Your Student Level..."
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
              id="totaladdition"
              label="Total Addition"
              type="text"
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