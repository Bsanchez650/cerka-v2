import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, MapPin, Star, Shield, Clock, TrendingUp, ArrowRight, Sparkles, Users, Award } from "lucide-react";
import { Navigation } from "../components/Navigation";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { api } from "../services/api";

const categoryIcons = {
  "Hair": "✂️",
  "Lashes & Brows": "💄",
  "Nails": "💅",
  "Skincare": "✨",
  "Barber": "💈",
};

const serviceImages = [
  {
    name: "Haircut & Styling",
    image: "https://images.unsplash.com/photo-1547648946-2b1fd7eab923?w=800&h=600&fit=crop",
    link: "/search?service=haircut",
  },
  {
    name: "Eyelash Extensions",
    image: "https://images.unsplash.com/photo-1519415387722-a1c3bbef716c?w=800&h=600&fit=crop",
    link: "/search?service=lashes",
  },
  {
    name: "Nail Art",
    image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&h=600&fit=crop",
    link: "/search?service=nails",
  },
  {
    name: "Skin Treatments",
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&h=600&fit=crop",
    link: "/search?service=skincare",
  },
];

export function Landing() {
  const [categories, setCategories] = useState([]);
  const [providers, setProviders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("Redwood City, CA");

  useEffect(() => {
    api.get("/categories").then(setCategories).catch(console.error);
    api.get("/providers").then(setProviders).catch(console.error);
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-purple-900/20 to-zinc-950 pointer-events-none" />
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-zinc-900/50 border border-zinc-800 rounded-full px-4 py-2 mb-8 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-red-400" />
              <span className="text-sm text-zinc-300">Discover Local Talent Near You</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Find Your Perfect{" "}
              <span className="bg-gradient-to-r from-red-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Service Provider
              </span>
            </h1>

            <p className="text-xl text-zinc-400 mb-12 max-w-2xl mx-auto">
              Connect with verified independent barbers, lash techs, estheticians, and beauty professionals in your area.
            </p>

            {/* Search Bar - Yelp Style */}
            <div className="max-w-3xl mx-auto mb-8">
              <div className="bg-white rounded-xl shadow-2xl p-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Find
                    </label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        type="text"
                        placeholder="barbers, lash techs, hair stylists..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 h-12 border-gray-300 focus:border-red-500 focus:ring-red-500 bg-white text-gray-900"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Near
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        type="text"
                        placeholder="Redwood City, CA"
                        value={locationQuery}
                        onChange={(e) => setLocationQuery(e.target.value)}
                        className="pl-10 h-12 border-gray-300 focus:border-red-500 focus:ring-red-500 bg-white text-gray-900"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <Link to={`/search?q=${searchQuery}&location=${locationQuery}`}>
                    <Button className="w-full md:w-auto bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white px-12 h-12 font-semibold">
                      Search
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center gap-8 text-sm text-zinc-400">
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                <span>{providers.length > 0 ? `${providers.length}+ Providers` : "Loading..."}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-green-500" />
                <span>Verified Professionals</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-red-500" />
                <span>Instant Booking</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-zinc-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Browse by Category</h2>
            <p className="text-zinc-400">Find the perfect service for your needs</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {categories.map((category) => (
              <Link key={category.id} to={`/search?category=${category.id}`}>
                <div className="group relative bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-2xl p-8 text-center transition-all hover:scale-105 hover:border-red-500/50 cursor-pointer">
                  <div className="text-4xl mb-3">{categoryIcons[category.name] || "📌"}</div>
                  <h3 className="font-semibold text-white group-hover:text-red-400 transition-colors">
                    {category.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Services - Photo Focused */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Popular Services</h2>
            <p className="text-zinc-400">Explore what's trending in your area</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {serviceImages.map((service) => (
              <Link to={service.link} key={service.name} className="group">
                <div className="bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800 hover:border-red-500/50 transition-all hover:shadow-xl hover:shadow-red-500/10">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-white group-hover:text-red-400 transition-colors">{service.name}</h3>
                    <p className="text-sm text-zinc-500 mt-1">Providers nearby</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section with Gradient Numbers */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-zinc-900/30">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 text-center">
              <p className="text-4xl font-bold mb-2 bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">150+</p>
              <p className="text-sm text-zinc-400 uppercase tracking-wider">Providers</p>
            </div>
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 text-center">
              <p className="text-4xl font-bold mb-2 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">2,400+</p>
              <p className="text-sm text-zinc-400 uppercase tracking-wider">Bookings</p>
            </div>
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 text-center">
              <p className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-500 to-cyan-500 bg-clip-text text-transparent">4.8</p>
              <p className="text-sm text-zinc-400 uppercase tracking-wider">Avg Rating</p>
            </div>
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 text-center">
              <p className="text-4xl font-bold mb-2 bg-gradient-to-r from-teal-500 to-green-500 bg-clip-text text-transparent">{categories.length}</p>
              <p className="text-sm text-zinc-400 uppercase tracking-wider">Categories</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Providers */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-2">Featured Providers</h2>
              <p className="text-zinc-400">Top-rated professionals in your area</p>
            </div>
            <Link to="/search" className="text-red-400 hover:text-red-300 text-sm font-medium flex items-center gap-1">
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {providers.map((provider) => (
              <Link to={`/provider/${provider.id}`} key={provider.id} className="group">
                <div className="bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800 hover:border-red-500/50 transition-all hover:shadow-xl hover:shadow-red-500/10">
                  <div className="h-48 bg-gradient-to-br from-zinc-800 to-zinc-900 relative overflow-hidden">
                    {provider.avatar_url ? (
                      <img src={provider.avatar_url} alt={provider.name} className="w-full h-full object-cover opacity-30" />
                    ) : null}
                    <div className="absolute bottom-4 left-4 flex items-center gap-3">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-r from-red-600 to-pink-600 flex items-center justify-center text-white font-bold text-lg border-2 border-zinc-900">
                        {provider.business_name?.charAt(0) || "?"}
                      </div>
                      <div>
                        <p className="font-bold text-white text-lg">{provider.business_name}</p>
                        <p className="text-zinc-400 text-sm">{provider.name}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-5">
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
                        {provider.avg_rating} ({provider.total_reviews} reviews)
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
        </div>
      </section>

      {/* For Providers CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-red-900/20 to-purple-900/20">
        <div className="max-w-5xl mx-auto">
          <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-3xl p-12 text-center">
            <Award className="w-12 h-12 mx-auto mb-6 text-red-400" />
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Are You a Service Provider?</h2>
            <p className="text-xl text-zinc-400 mb-8 max-w-2xl mx-auto">
              Join Cerka and grow your business. Connect with new clients, manage your schedule, and build your reputation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/api/auth/google">
                <Button size="lg" className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white px-8">
                  Get Started Free
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Why Choose Cerka?</h2>
            <p className="text-zinc-400">The best platform for local service discovery</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8">
              <Shield className="w-10 h-10 mb-4 text-green-400" />
              <h3 className="text-xl font-bold mb-3">Verified Professionals</h3>
              <p className="text-zinc-400">All providers are verified to ensure quality and safety.</p>
            </div>
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8">
              <MapPin className="w-10 h-10 mb-4 text-red-400" />
              <h3 className="text-xl font-bold mb-3">Location-Based Search</h3>
              <p className="text-zinc-400">Find services near you with precise distance calculations.</p>
            </div>
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8">
              <Star className="w-10 h-10 mb-4 text-yellow-400" />
              <h3 className="text-xl font-bold mb-3">Honest Reviews</h3>
              <p className="text-zinc-400">Read authentic reviews from real customers.</p>
            </div>
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8">
              <Clock className="w-10 h-10 mb-4 text-purple-400" />
              <h3 className="text-xl font-bold mb-3">Real-Time Availability</h3>
              <p className="text-zinc-400">See provider schedules and book appointments instantly.</p>
            </div>
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8">
              <TrendingUp className="w-10 h-10 mb-4 text-pink-400" />
              <h3 className="text-xl font-bold mb-3">Competitive Pricing</h3>
              <p className="text-zinc-400">Compare prices across providers and find the best value.</p>
            </div>
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8">
              <Users className="w-10 h-10 mb-4 text-cyan-400" />
              <h3 className="text-xl font-bold mb-3">Trusted Community</h3>
              <p className="text-zinc-400">Join our growing network of customers and professionals.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            Ready to Find Your Perfect Provider?
          </h2>
          <p className="text-xl text-zinc-400 mb-8">
            Join thousands of satisfied customers discovering local talent
          </p>
          <Link to="/search">
            <Button size="lg" className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white px-12">
              Start Searching Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="text-2xl font-bold bg-gradient-to-r from-red-500 to-pink-600 bg-clip-text text-transparent mb-4">
                Cerka 
              </div>
              <p className="text-zinc-400 text-sm">
                Connecting customers with independent service providers.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Customers</h4>
              <ul className="space-y-2 text-sm text-zinc-400">
                <li><Link to="/search" className="hover:text-white transition-colors">Find Providers</Link></li>
                <li><a href="/api/auth/google" className="hover:text-white transition-colors">Sign Up</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Providers</h4>
              <ul className="space-y-2 text-sm text-zinc-400">
                <li><a href="/api/auth/google" className="hover:text-white transition-colors">Get Started</a></li>
                <li><Link to="/provider/dashboard" className="hover:text-white transition-colors">Provider Dashboard</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-zinc-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-zinc-800 text-center text-sm text-zinc-400">
            <p>&copy; 2026 Cerka . All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
