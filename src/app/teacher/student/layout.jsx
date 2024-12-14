import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { TeacherStoreProvider } from "@/providers/teacher-store-provider";
import { UserStoreProvider } from "@/providers/user-store-provider";

export default function StudentRootLayout({ children }) {
  return (
    <>
      <UserStoreProvider>
        <DefaultLayout>{children}</DefaultLayout>
      </UserStoreProvider>
    </>
  );
}
