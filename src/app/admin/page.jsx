import ECommerce from "@/components/Dashboard/E-commerce";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { TestStoreProvider } from "@/providers/test-store-provider";
import { UserStoreProvider } from "@/providers/user-store-provider";
import StudentLists from "./student/page";

export const metadata = {
  title: "Lakshya Admin",
  description: "Lakshya Admin - Admin Dashboard",
};

export default function Home() {
  return (
    <>
      <UserStoreProvider>
        <TestStoreProvider>
          <DefaultLayout>
            <StudentLists />
          </DefaultLayout>
        </TestStoreProvider>
      </UserStoreProvider>
    </>
  );
}
