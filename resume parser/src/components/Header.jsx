export default function Header() {
  return (
    <header className="border-b border-slate-800">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <span className="text-lg font-bold tracking-tight">
          Resume<span className="text-indigo-400">Parser</span>
        </span>
        <a href="#analyzer" className="rounded-md bg-indigo-500 px-4 py-2 text-sm font-semibold hover:bg-indigo-400">
          Try it
        </a>
      </nav>
    </header>
  );
}
