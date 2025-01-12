import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { AdvertisementStoreProvider } from "@/providers/advertisement-store-provider";

export default function StudentRootLayout({ children }) {
  return (
    <>
      <AdvertisementStoreProvider>
        <DefaultLayout>{children}</DefaultLayout>
      </AdvertisementStoreProvider>
    </>
  );
}
