"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useActivationMutation } from "@/redux/features/authApiSlice";
import { toast } from "react-toastify";

export default async function Page({
  params,
}: {
  params: Promise<{ uid: string; token: string }>;
}) {
  const { uid, token } = await params;

  // You can use props or context to pass this into your client component
  return <ActivationClient uid={uid} token={token} />;
}

// Separate the client logic into its own component
function ActivationClient({ uid, token }: { uid: string; token: string }) {
  const router = useRouter();
  const [activation] = useActivationMutation();

  useEffect(() => {
    activation({ uid, token })
      .unwrap()
      .then(() => {
        toast.success("Account activated");
      })
      .catch(() => {
        toast.error("Failed to activate account");
      })
      .finally(() => {
        router.push("/auth/login");
      });
  }, [uid, token]);

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h1 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Activating your account...
        </h1>
      </div>
    </div>
  );
}
