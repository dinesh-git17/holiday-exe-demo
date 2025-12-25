export default function Home(): React.JSX.Element {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black font-mono text-green-500">
      <main className="flex flex-col items-center gap-8 px-4 text-center">
        <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
          HOLIDAY.EXE
        </h1>
        <p className="max-w-md text-lg text-green-400/80">
          North Pole Connection Showcase
        </p>
        <div className="mt-8 animate-pulse text-sm text-green-500/60">
          [ COMING SOON ]
        </div>
      </main>
    </div>
  );
}
