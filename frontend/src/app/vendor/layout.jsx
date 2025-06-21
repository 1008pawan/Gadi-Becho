"use client";

import { useRouter } from "next/navigation";
import VendorNavbar from "./VendorNavbar";
import { useEffect } from "react";

export default function VendorLayout({ children }) {
  const router = useRouter();

  // Check for admin authentication
  useEffect(() => {
    const vendor = localStorage.getItem("vendortoken");
    if (!vendor) {
      router.push("/vendor-login");
    }
  }, [router]);

  return (
    <div>
      <VendorNavbar />
      <main className="p-6">{children}</main>
    </div>
  );
}
