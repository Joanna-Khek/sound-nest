import type { Metadata } from "next";
import { PasswordResetConfirmForm } from "@/components/forms";

export const metadata: Metadata = {
  title: "Sound Nest | Password Reset Confirm",
  description: "Password reset confirm page",
};

export default async function Page({
  params,
}: {
  params: Promise<{ uid: string; token: string }>;
}) {
  const { uid, token } = await params;
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="Sound Nest"
          src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Reset your password
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <PasswordResetConfirmForm uid={uid} token={token} />
      </div>
    </div>
  );
}
