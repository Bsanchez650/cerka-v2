import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Star } from "lucide-react";
import { Navigation } from "../components/Navigation";
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
      <div className="pt-24 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Provider Header */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 mb-8">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-red-600 to-pink-600 flex items-center justify-center text-white font-bold text-2xl">
                {provider.business_name?.charAt(0)}
              </div>
              <div>
                <h1 className="text-3xl font-bold">{provider.business_name}</h1>
                <p className="text-zinc-400">{provider.name}</p>
                <div className="flex items-center gap-2 mt-2">
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
              </div>
            </div>
            {provider.bio && (
              <p className="text-zinc-400 mt-6">{provider.bio}</p>
            )}
          </div>

          {/* Services */}
          <h2 className="text-2xl font-bold mb-4">Services</h2>
          <div className="space-y-4">
            {services.map((service) => (
              <div key={service.id} className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 flex justify-between items-center">
                <div>
                  <h3 className="font-semibold text-lg">{service.name}</h3>
                  <p className="text-zinc-500 text-sm">{service.category} · {service.duration_minutes} min</p>
                  {service.description && (
                    <p className="text-zinc-400 text-sm mt-1">{service.description}</p>
                  )}
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold">${service.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
