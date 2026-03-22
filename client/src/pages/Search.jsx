import { Navigation } from "../components/Navigation";

export function SearchPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Navigation />
      <div className="pt-24 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Search & Discovery</h1>
          <p className="text-zinc-400">Coming soon — trie autocomplete + proximity search</p>
        </div>
      </div>
    </div>
  );
}
