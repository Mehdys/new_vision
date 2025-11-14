import Counter from "@/components/Counter";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">
        NewVision 🚀
      </h1>
      <p className="text-lg text-gray-600 mb-6 text-center max-w-xl">
        Your sandbox to learn full-stack and ship AI products end-to-end.
      </p>
      <Counter />
    </main>
  );
}

