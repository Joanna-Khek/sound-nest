import { GetPredictionsForm } from "@/components/forms";

export default function Page() {
  return (
    <>
      <header className="bg-white-shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-light text-gray-900">
            Explore Songs
          </h1>
        </div>
      </header>
      <main className="mx-auto max-w-7xl py-6 my-8 sm:px-6 lg:px-8">
        <GetPredictionsForm />
      </main>
    </>
  );
}
