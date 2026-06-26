"use client";

import React from "react";
import { Check, Sparkles } from "lucide-react";

function Upgrade() {
  const plans = [
    {
      name: "Starter",
      description: "Ideal for testing the waters and exploring basic AI course layouts.",
      price: "0",
      features: [
        "Create up to 5 courses total",
        "Structured course outline generator",
        "Standard YouTube video syncing",
        "Basic difficulty level tuning",
        "Community forum support",
      ],
      cta: "Current Plan",
      popular: false,
      ctaStyle: "border border-neutral-800 text-neutral-400 cursor-not-allowed bg-neutral-900/50",
    },
    {
      name: "Pro Learner",
      description: "Perfect for active students, developers, and professionals building continuous skills.",
      price: "9",
      features: [
        "Create unlimited courses",
        "Deep chapter expansions and explanations",
        "Advanced YouTube educational sync algorithm",
        "HD media selection matches",
        "Toggle public & private course visibility",
        "Priority AI generation response speeds",
        "24/7 dedicated support desk",
      ],
      cta: "Upgrade to Pro",
      popular: true,
      ctaStyle: "bg-[#DEDBC8] text-black hover:bg-[#E1E0CC] transition-transform hover:scale-[1.03] active:scale-95",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto py-8">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-medium tracking-tight text-[#E1E0CC]">
          Unlock <span className="font-serif italic text-primary font-normal">Infinite Learning</span>
        </h1>
        <p className="text-sm text-neutral-400 mt-3 max-w-lg mx-auto leading-relaxed">
          Upgrade your workspace resources to build unlimited AI-curated courses and access deep learning configurations.
        </p>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
        {plans.map((plan, idx) => (
          <div
            key={idx}
            className={`relative flex flex-col justify-between p-8 rounded-2xl border bg-[#151515] transition-all duration-300 ${
              plan.popular
                ? "border-primary/50 shadow-lg shadow-primary/5"
                : "border-neutral-900"
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3 right-6 bg-[#DEDBC8] text-black text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                <Sparkles className="w-3 h-3" /> Most Popular
              </div>
            )}

            <div>
              <h2 className="text-xl font-medium text-[#E1E0CC]">{plan.name}</h2>
              <p className="text-xs text-neutral-400 mt-2 leading-relaxed min-h-[36px]">
                {plan.description}
              </p>

              {/* Price */}
              <div className="flex items-baseline gap-1 mt-6 mb-8">
                <span className="text-4xl font-bold text-[#E1E0CC]">${plan.price}</span>
                <span className="text-xs text-neutral-500 font-mono">/ month</span>
              </div>

              {/* Features List */}
              <hr className="border-neutral-900 my-6" />
              <ul className="flex flex-col gap-3.5">
                {plan.features.map((feat, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-3 text-xs sm:text-sm">
                    <div className="rounded-full bg-neutral-900 p-0.5 border border-neutral-800 shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 text-primary" />
                    </div>
                    <span className="text-neutral-300 leading-normal">{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8">
              <button
                className={`w-full py-3 px-4 rounded-full text-xs font-semibold select-none flex items-center justify-center ${plan.ctaStyle}`}
                disabled={!plan.popular}
              >
                {plan.cta}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Upgrade;