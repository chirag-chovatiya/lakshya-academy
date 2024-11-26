import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { TestStoreProvider } from "@/providers/test-store-provider";

export const metadata = {
  title: "Lakshya Admin",
  description: "Lakshya Admin - Admin Dashboard",
};

export default function StudentRootLayout({ children }) {
  return (
    <>
      <TestStoreProvider>
        <DefaultLayout>{children}</DefaultLayout>
      </TestStoreProvider>
    </>
  );
}
