"use client";

import { useEffect, useState } from "react";

const CITIES = [
  { id: "Surat", name: "Surat (Wholesale Hub)" },
  { id: "Mumbai", name: "Mumbai (Zaveri Bazar)" },
  { id: "Delhi", name: "Delhi / NCR" },
  { id: "Ahmedabad", name: "Ahmedabad" },
  { id: "Bangalore", name: "Bangalore" },
  { id: "International", name: "International (USD/Global)" },
];

export default function LocationPrompt() {
  const [showPrompt, setShowPrompt] = useState(false);
  const [selectedCity, setSelectedCity] = useState("Surat");
  const [isDetecting, setIsDetecting] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("soni_user_location");
    if (!saved) {
      // Delay prompt slightly for elegant entrance
      const timer = setTimeout(() => setShowPrompt(true), 1200);
      return () => clearTimeout(timer);
    } else {
      setSelectedCity(saved);
    }
  }, []);

  const handleSelectLocation = (city: string) => {
    setSelectedCity(city);
    localStorage.setItem("soni_user_location", city);
    window.dispatchEvent(new CustomEvent("soni_location_changed", { detail: city }));
    setShowPrompt(false);
  };

  const handleDetectLocation = () => {
    setIsDetecting(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            const res = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            if (res.ok) {
              const data = await res.json();
              const city =
                data.address?.city ||
                data.address?.town ||
                data.address?.state ||
                "Surat";
              handleSelectLocation(city);
            } else {
              handleSelectLocation("Surat");
            }
          } catch {
            handleSelectLocation("Surat");
          } finally {
            setIsDetecting(false);
          }
        },
        () => {
          setIsDetecting(false);
          handleSelectLocation("Surat");
        }
      );
    } else {
      setIsDetecting(false);
      handleSelectLocation("Surat");
    }
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-4 left-3 right-3 sm:right-auto sm:left-6 sm:bottom-6 z-40 max-w-md w-auto rounded-2xl border border-gold/40 bg-ink-panel/95 p-4 sm:p-5 shadow-2xl backdrop-blur-xl -webkit-backdrop-blur-xl animate-fade-in">
      <div className="flex items-start justify-between gap-3 border-b border-line-soft pb-3">
        <div className="flex items-center gap-2 text-gold">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="font-serif text-sm text-bone">Select Your Location</span>
        </div>
        <button
          onClick={() => handleSelectLocation("Surat")}
          className="text-bone-faint hover:text-bone text-xs"
        >
          Skip (Default Surat)
        </button>
      </div>

      <p className="mt-3 text-xs leading-relaxed text-bone-dim">
        We personalize real-time gold rates (24K, 22K, 18K, 14K) based on your market location.
      </p>

      <div className="mt-4 space-y-2">
        <button
          type="button"
          onClick={handleDetectLocation}
          disabled={isDetecting}
          className="w-full btn-primary text-xs py-2 flex items-center justify-center gap-2"
        >
          {isDetecting ? "Detecting location..." : "📍 Auto-Detect My Location"}
        </button>

        <div className="grid grid-cols-2 gap-1.5 pt-1">
          {CITIES.map((c) => (
            <button
              key={c.id}
              onClick={() => handleSelectLocation(c.id)}
              className="text-left text-[0.7rem] px-2.5 py-1.5 rounded-lg border border-gold/20 bg-ink/50 text-bone-dim hover:text-gold hover:border-gold/50 transition-colors"
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
