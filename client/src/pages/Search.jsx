import { useState, useEffect, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Navigation } from "../components/Navigation";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Trie } from "../lib/trie";
import { MaxHeap } from "../lib/heap";
import { api } from "../services/api";
import { Search as SearchIcon, Star, X } from "lucide-react";

export function SearchPage() {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [categories, setCategories] = useState([]);
  const [providers, setProviders] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sortMode, setSortMode] = useState("best");

  // Build trie from keywords and categories
  const trie = useMemo(() => {
    const t = new Trie();
    const keywords = [
      "haircut", "hair", "styling", "barber", "fade",
      "lashes", "lash", "eyelash", "extensions", "classic", "volume",
      "nails", "manicure", "pedicure", "gel", "acrylic",
      "facial", "skincare", "esthetician", "treatment",
      "beard", "trim", "brows", "eyebrow", "waxing",
    ];
    keywords.forEach((word) => t.insert(word, { type: "keyword", value: word }));
    categories.forEach((cat) => {
      t.insert(cat.name, { type: "category", value: cat.name, id: cat.id });
    });
    return t;
  }, [categories]);

  // Load categories
  useEffect(() => {
    api.get("/categories").then(setCategories).catch(console.error);
  }, []);

  function scoreProvider(provider){
    const rating = provider.avg_rating || 0;
    const reviews = provider.total_reviews || 0;
    const walkins = provider.accepts_walkins ? 1 : 0;
    return (rating * 10) + (Math.log(reviews + 1) * 2) + walkins;
  }

  function getCompareFn(mode) {
    // if mode is "best", use scoreProvider
    if(mode === "best"){
      return (a,b) => scoreProvider(a)-scoreProvider(b);
    }
    if(mode === "rating"){
      return (a,b) => (a.avg_rating || 0)- (b.avg_rating || 0);
    }
    if(mode === "reviews"){
      return (a ,b) => (a.total_reviews || 0) - (b.total_reviews || 0);
    }
    // if mode is "rating", compare by avg_rating
    // if mode is "reviews", compare by total_reviews
  }

  // Search when query or category changes
  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (query) params.set("q", query);
        if (selectedCategory) params.set("category", selectedCategory);
        const results = await api.get(`/search?${params.toString()}`);
        const heap = new MaxHeap(getCompareFn(sortMode));
        results.forEach(provider => heap.insert(provider));
        const sorted = [];
        while(heap.size() > 0){
          sorted.push(heap.extractMax());
        }
        setProviders(sorted);
        
      } catch (err) {
        console.error("Search failed:", err);
      }
      setLoading(false);
    };
    fetchResults();
  }, [query, selectedCategory, sortMode]);

  // Trie autocomplete
  const handleInputChange = (value) => {
    setQuery(value);
    if (value.length >= 2) {
      const results = trie.autocomplete(value, 5);
      if (results.length === 0) {
        const fuzzy = trie.fuzzySearch(value, 2, 5);
        setSuggestions(fuzzy.map((r) => ({ word: r.word, data: r.data })));
      } else {
        setSuggestions(results);
      }
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const selectSuggestion = (suggestion) => {
    setQuery(suggestion.word);
    setShowSuggestions(false);
    if (suggestion.data?.type === "category") {
      setSelectedCategory(suggestion.data.id);
    }
  };

  const clearFilters = () => {
    setQuery("");
    setSelectedCategory("");
    setSuggestions([]);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Navigation />

      <div className="pt-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">

          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-6">Find Service Providers</h1>

            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                <Input
                  type="text"
                  placeholder="Search services, providers..."
                  value={query}
                  onChange={(e) => handleInputChange(e.target.value)}
                  onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                  className="pl-10 h-12 bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-500 focus:border-red-500"
                />

                {showSuggestions && suggestions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden z-50 shadow-xl">
                    {suggestions.map((s, i) => (
                      <button
                        key={i}
                        className="w-full px-4 py-3 text-left hover:bg-zinc-800 flex items-center gap-3 transition-colors"
                        onMouseDown={() => selectSuggestion(s)}
                      >
                        <SearchIcon className="w-4 h-4 text-zinc-500" />
                        <span className="text-zinc-200">{s.word}</span>
                        {s.data?.type === "category" && (
                          <span className="text-xs text-red-400 ml-auto">Category</span>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="h-12 px-4 bg-zinc-900 border border-zinc-800 rounded-md text-white focus:border-red-500 outline-none"
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
              <select
                value = {sortMode}
                onChange={(e) => setSortMode(e.target.value)}
                className="h-12 px-4 bg-zinc-900 border border-zinc-800 rounded-md text-white focus:border-red-500 outline-none"
                >
                  <option value="best">Best Overall</option>
                  <option value="rating">Top Rated</option>
                  <option value="reviews">Most Reviewed</option>
                </select>
              

              {(query || selectedCategory) && (
                <Button
                  onClick={clearFilters}
                  variant="ghost"
                  className="text-zinc-400 hover:text-white h-12"
                >
                  <X className="w-4 h-4 mr-2" />
                  Clear
                </Button>
              )}
            </div>
          </div>

          <p className="text-zinc-400 mb-6">
            {loading ? "Searching..." : `${providers.length} provider${providers.length !== 1 ? "s" : ""} found`}
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {providers.map((provider) => (
              <Link to={`/provider/${provider.id}`} key={provider.id} className="group">
                <div className="bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800 hover:border-red-500/50 transition-all hover:shadow-xl hover:shadow-red-500/10">
                  <div className="h-40 bg-gradient-to-br from-zinc-800 to-zinc-900 relative">
                    <div className="absolute bottom-4 left-4 flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-red-600 to-pink-600 flex items-center justify-center text-white font-bold text-lg border-2 border-zinc-900">
                        {provider.business_name?.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-white">{provider.business_name}</p>
                        <p className="text-zinc-400 text-sm">{provider.name}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < Math.round(provider.avg_rating) ? "text-red-500 fill-red-500" : "text-zinc-700"}`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-zinc-400">
                        {provider.avg_rating} ({provider.total_reviews})
                      </span>
                    </div>
                    {provider.bio && (
                      <p className="text-zinc-500 text-sm line-clamp-2">{provider.bio}</p>
                    )}
                    {provider.accepts_walkins && (
                      <span className="inline-block mt-3 text-xs text-teal-400 bg-teal-500/10 border border-teal-500/20 px-3 py-1 rounded-full">
                        Walk-ins OK
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {!loading && providers.length === 0 && (
            <div className="text-center py-20">
              <SearchIcon className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No providers found</h3>
              <p className="text-zinc-500">Try a different search or browse by category</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}