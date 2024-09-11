import ECommerce from "@/components/Dashboard/E-commerce";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata = {
  title: "MedEx Admin",
  description: "MedEx Admin - Admin Dashboard",
};

export default function Home() {
  return (
    <>
     
          <DefaultLayout>
            <ECommerce />
          </DefaultLayout>

    </>
  );
}
