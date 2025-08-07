import Footer from "@/components/layout/footer";
import DesktopHeader from "@/components/layout/header/desktop-header";
import MobileHeader from "@/components/layout/header/mobile-header";
import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <>
      {/* Header */}
      <DesktopHeader />
      <MobileHeader />

      <main className="">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
