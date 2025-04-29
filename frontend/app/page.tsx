import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sound Nest | Home",
  description: "Sound Nest home page",
};

export default function Page() {
  return (
    <main className="bg-white">
      <div className="relative isolate px-5 lg:px-5">
        <div className="mx-auto max-w-2xl">
          <img
            src="https://raw.githubusercontent.com/Joanna-Khek/sound-nest/refs/heads/main/frontend/public/sound_nest_logo_1.svg"
            alt="Sound Nest Logo"
            className="mx-auto block w-150 h-auto"
          />
          <div className="text-center">
            <p className="text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
              Explore your music preferences and discover new sounds
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/auth/login"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Log into your account
              </Link>
              <Link
                href="/auth/register"
                className="text-sm/6 font-semibold text-gray-900"
              >
                Or create an account <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
