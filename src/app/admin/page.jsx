import ECommerce from "@/components/Dashboard/E-commerce";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { UserStoreProvider } from "@/providers/user-store-provider";

export const metadata = {
  title: "MedEx Admin",
  description: "MedEx Admin - Admin Dashboard",
};

export default function Home() {
  return (
    <>
      <UserStoreProvider>
        <DefaultLayout>
          <ECommerce />
        </DefaultLayout>
      </UserStoreProvider>
    </>
  );
}
