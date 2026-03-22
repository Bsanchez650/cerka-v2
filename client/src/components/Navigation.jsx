import { Link, useLocation } from "react-router-dom";
import { Search, User, Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";
import { api } from "../services/api";

export function Navigation() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const isLanding = location.pathname === "/";

  useEffect(() => {
    api.get("/auth/me")
      .then(setUser)
      .catch(() => setUser(null));
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md ${isLanding ? "bg-zinc-950/80" : "bg-zinc-950 border-b border-zinc-800"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold bg-gradient-to-r from-red-500 to-pink-600 bg-clip-text text-transparent">
              Cerka
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/search"
              className="text-zinc-300 hover:text-white transition-colors text-sm font-medium"
            >
              Find Providers
            </Link>
            <Link
              to="/provider/dashboard"
              className="text-zinc-300 hover:text-white transition-colors text-sm font-medium"
            >
              Become a Provider
            </Link>
            {user && (
              <Link
                to="/dashboard"
                className="text-zinc-300 hover:text-white transition-colors text-sm font-medium"
              >
                Dashboard
              </Link>
            )}
          </div>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/search">
              <Button variant="ghost" size="sm" className="text-zinc-300 hover:text-white">
                <Search className="w-4 h-4" />
              </Button>
            </Link>
            {user ? (
              <div className="flex items-center space-x-3">
                <span className="text-sm text-zinc-300">{user.name}</span>
                {user.avatar_url && (
                  <img
                    src={user.avatar_url}
                    alt={user.name}
                    className="w-8 h-8 rounded-full border border-zinc-700"
                  />
                )}
                <a href="/api/auth/logout">
                  <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white">
                    Logout
                  </Button>
                </a>
              </div>
            ) : (
              <>
                <a href="/api/auth/google">
                  <Button variant="ghost" size="sm" className="text-zinc-300 hover:text-white">
                    Login
                  </Button>
                </a>
                <a href="/api/auth/google">
                  <Button size="sm" className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white">
                    Sign Up
                  </Button>
                </a>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-zinc-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-zinc-950 border-b border-zinc-800">
          <div className="px-4 pt-2 pb-4 space-y-3">
            <Link
              to="/search"
              className="block text-zinc-300 hover:text-white transition-colors text-sm font-medium py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Find Providers
            </Link>
            <Link
              to="/provider/dashboard"
              className="block text-zinc-300 hover:text-white transition-colors text-sm font-medium py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Become a Provider
            </Link>
            {user && (
              <Link
                to="/dashboard"
                className="block text-zinc-300 hover:text-white transition-colors text-sm font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
            )}
            <div className="pt-4 space-y-2">
              {user ? (
                <a href="/api/auth/logout">
                  <Button variant="outline" className="w-full">Logout</Button>
                </a>
              ) : (
                <a href="/api/auth/google">
                  <Button className="w-full bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white">
                    Sign In with Google
                  </Button>
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
