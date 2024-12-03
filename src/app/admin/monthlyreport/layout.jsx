import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { UserStoreProvider } from "@/providers/user-store-provider";

export const metadata = {
  title: "Lakshya Admin",
  description: "Lakshya Admin - Admin Dashboard",
};

export default function StudentRootLayout({ children }) {
  return (
    <>
      <UserStoreProvider>
        <DefaultLayout>{children}</DefaultLayout>
      </UserStoreProvider>
    </>
  );
}
