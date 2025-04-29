"use client";

import { ToastContainer } from "react-toastify";
import { useVerify } from "@/hooks";

export default function Setup() {
  useVerify();

  return <ToastContainer />;
}
