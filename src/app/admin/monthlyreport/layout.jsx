import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata = {
  title: "Lakshya Admin",
  description: "Lakshya Admin - Admin Dashboard",
};

export default function StudentRootLayout({ children }) {
  return (
    <>
        <DefaultLayout>{children}</DefaultLayout>
    </>
  );
}
