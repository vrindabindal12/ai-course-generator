"use client";

import React, { useState, useRef } from "react";
import { Check, Sparkles, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

function Upgrade() {
  const [billingCycle, setBillingCycle] = useState("monthly"); // "monthly" or "annual"

  const plans = [
    {
      name: "Starter",
      price: 0,
      period: billingCycle === "monthly" ? "/ month" : "/ year",
      description: "Perfect for exploring basic AI course layouts.",
      features: [
        "Create up to 5 courses total",
        "Up to 5 chapters per course",
        "Standard generation speed",
        "Community forum support",
      ],
      cta: "Current Plan",
      popular: false,
      disabled: true,
      ctaStyle: "border border-neutral-800 text-neutral-400 cursor-not-allowed bg-neutral-900/50",
    },
    {
      name: "Pro",
      price: billingCycle === "monthly" ? 12 : 99,
      period: billingCycle === "monthly" ? "/ month" : "/ year",
      description: "Unlock the full power of AI-curated learning paths.",
      features: [
        "Create unlimited courses",
        "Up to 20 chapters per course",
        "High-priority generation speed",
        "Ad-free YouTube video sync",
        "Custom banner image uploads",
        "Priority AI request scheduling",
      ],
      cta: "Upgrade to Pro",
      popular: true,
      disabled: false,
      ctaStyle: "bg-[#DEDBC8] text-black hover:bg-[#E1E0CC] transition-transform hover:scale-[1.03] active:scale-95",
    },
    {
      name: "Enterprise",
      price: billingCycle === "monthly" ? 29 : 249,
      period: billingCycle === "monthly" ? "/ month" : "/ year",
      description: "For institutions, organizations, and continuous learning teams.",
      features: [
        "Everything in Pro plan",
        "Collaborative shared workspaces",
        "Course export to PDF & Markdown",
        "Custom Gemini prompt personalization",
        "Dedicated API key access",
        "Dedicated support representative",
      ],
      cta: "Upgrade to Enterprise",
      popular: false,
      disabled: false,
      ctaStyle: "border border-neutral-700 text-[#E1E0CC] hover:bg-neutral-800 hover:border-neutral-600 transition-transform hover:scale-[1.03] active:scale-95",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 md:px-8">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-medium tracking-tight text-[#E1E0CC]">
          Upgrade Your <span className="font-serif italic text-primary font-normal">Learning Workspace</span>
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400 mt-3 max-w-lg mx-auto leading-relaxed">
          Upgrade your workspace resources to build unlimited AI-curated courses and access deep learning configurations.
        </p>
      </div>

      {/* Toggle Switch */}
      <div className="flex justify-center items-center gap-4 mb-12">
        <span className={`text-sm ${billingCycle === "monthly" ? "text-[#E1E0CC]" : "text-gray-500"} transition-colors duration-200`}>Monthly</span>
        <button 
          onClick={() => setBillingCycle(billingCycle === "monthly" ? "annual" : "monthly")}
          className="w-12 h-6 rounded-full bg-neutral-800 p-1 flex items-center relative transition-colors duration-300 focus:outline-none"
          aria-label="Toggle billing cycle"
        >
          <motion.div 
            className="w-4 h-4 rounded-full bg-primary"
            layout
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            style={{
              alignSelf: billingCycle === "monthly" ? "flex-start" : "flex-end",
              marginLeft: billingCycle === "monthly" ? "0" : "auto"
            }}
          />
        </button>
        <span className={`text-sm flex items-center gap-1.5 ${billingCycle === "annual" ? "text-[#E1E0CC]" : "text-gray-500"} transition-colors duration-200`}>
          Annually
          <span className="bg-primary/20 text-primary text-[10px] font-semibold px-2 py-0.5 rounded-full">Save 20%</span>
        </span>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto items-stretch">
        {plans.map((plan, idx) => (
          <div
            key={idx}
            className={`relative flex flex-col justify-between p-6 rounded-2xl border bg-[#101010] transition-all duration-300 ${
              plan.popular
                ? "border-primary/50 bg-[#151515] shadow-lg shadow-primary/5"
                : "border-neutral-800 hover:border-neutral-700"
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#DEDBC8] text-black text-[9px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                <Sparkles className="w-3 h-3" /> Most Popular
              </div>
            )}

            <div>
              <h2 className="text-lg font-medium text-[#E1E0CC]">{plan.name}</h2>
              <p className="text-xs text-neutral-400 mt-1.5 leading-relaxed min-h-[36px]">
                {plan.description}
              </p>

              {/* Price */}
              <div className="flex items-baseline gap-1 mt-5 mb-5">
                <span className="text-3xl md:text-4xl font-bold text-[#E1E0CC]">${plan.price}</span>
                <span className="text-xs text-neutral-500">{plan.period}</span>
              </div>

              {/* Features List */}
              <hr className="border-neutral-800 my-5" />
              <ul className="flex flex-col gap-3">
                {plan.features.map((feat, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-2.5 text-xs">
                    <Check className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                    <span className="text-neutral-300 leading-normal">{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8">
              <button
                className={`w-full py-2.5 px-4 rounded-full text-xs font-semibold select-none flex items-center justify-center gap-2 cursor-pointer ${plan.ctaStyle}`}
                disabled={plan.disabled}
              >
                <span>{plan.cta}</span>
                {!plan.disabled && <ArrowRight className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Upgrade;