import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Star, MapPin, Clock, Instagram, ArrowLeft, CheckCircle } from "lucide-react";
import { Navigation } from "../components/Navigation";
import { Button } from "../components/ui/button";
import { api } from "../services/api";

export function ProviderProfile() {
  const { id } = useParams();
  const [provider, setProvider] = useState(null);
  const [services, setServices] = useState([]);

  useEffect(() => {
    api.get(`/providers/${id}`).then(setProvider).catch(console.error);
    api.get(`/providers/${id}/services`).then(setServices).catch(console.error);
  }, [id]);

  if (!provider) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white">
        <Navigation />
        <div className="pt-24 px-4 text-center">
          <p className="text-zinc-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Navigation />

      <div className="pt-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">

          {/* Back Button */}
          <Link to="/search" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back to search</span>
          </Link>

          {/* Provider Header */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden mb-8">
            <div className="h-48 bg-gradient-to-br from-red-900/30 via-purple-900/20 to-zinc-900 relative">
              <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end gap-5">
                <div className="w-24 h-24 rounded-full bg-gradient-to-r from-red-600 to-pink-600 flex items-center justify-center text-white font-bold text-3xl border-4 border-zinc-900">
                  {provider.business_name?.charAt(0)}
                </div>
                <div className="mb-2">
                  <div className="flex items-center gap-3">
                    <h1 className="text-3xl font-bold">{provider.business_name}</h1>
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  </div>
                  <p className="text-zinc-400">{provider.name}</p>
                </div>
              </div>
            </div>

            <div className="p-6 pt-4">
              <div className="flex flex-wrap gap-6 mb-4">
                {/* Rating */}
                <div className="flex items-center gap-2">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${i < Math.round(provider.avg_rating) ? "text-red-500 fill-red-500" : "text-zinc-700"}`}
                      />
                    ))}
                  </div>
                  <span className="text-zinc-300 font-medium">{provider.avg_rating}</span>
                  <span className="text-zinc-500">({provider.total_reviews} reviews)</span>
                </div>

                {/* Walk-ins */}
                {provider.accepts_walkins && (
                  <span className="text-teal-400 bg-teal-500/10 border border-teal-500/20 px-3 py-1 rounded-full text-sm">
                    Walk-ins Welcome
                  </span>
                )}

                {/* Instagram */}
                {provider.instagram_handle && (
                  <a
                    href={`https://instagram.com/${provider.instagram_handle.replace("@", "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-pink-400 hover:text-pink-300 text-sm transition-colors"
                  >
                    <Instagram className="w-4 h-4" />
                    {provider.instagram_handle}
                  </a>
                )}
              </div>

              {/* Bio */}
              {provider.bio && (
                <p className="text-zinc-400 leading-relaxed">{provider.bio}</p>
              )}
            </div>
          </div>

          {/* Services */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6">Services</h2>
            <div className="space-y-4">
              {services.map((service) => (
                <div key={service.id} className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 flex justify-between items-center hover:border-zinc-700 transition-colors">
                  <div>
                    <h3 className="font-semibold text-lg text-white">{service.name}</h3>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-zinc-500 text-sm">{service.category}</span>
                      <span className="text-zinc-700">·</span>
                      <span className="flex items-center gap-1 text-zinc-500 text-sm">
                        <Clock className="w-3 h-3" />
                        {service.duration_minutes} min
                      </span>
                    </div>
                    {service.description && (
                      <p className="text-zinc-500 text-sm mt-2">{service.description}</p>
                    )}
                  </div>
                  <div className="text-right ml-4">
                    <p className="text-2xl font-bold text-white">${service.price}</p>
                    <Button className="mt-2 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white text-sm px-6">
                      Book Now
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}