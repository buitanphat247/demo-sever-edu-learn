import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import DarkConfigProvider from "../components/common/DarkConfigProvider";

export const dynamic = "force-dynamic";

export default function RootLayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      <DarkConfigProvider>
        <Header />
        <main>{children}</main>
        <Footer />
      </DarkConfigProvider>
    </>
  );
}
