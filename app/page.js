"use client";

import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import {
  WordsPullUp,
  WordsPullUpMultiStyle,
  ScrollRevealParagraph,
} from "./_components/PrismaComponents";

const navItems = ["Our story", "Collective", "Workshops", "Programs", "Inquiries"];

function Navbar() {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  return (
    <nav className="absolute top-0 left-1/2 -translate-x-1/2 z-50 w-[90%] sm:w-auto">
      <div className="bg-black rounded-b-2xl md:rounded-b-3xl px-4 py-2 md:px-8 flex items-center justify-center gap-3 sm:gap-6 md:gap-12 lg:gap-14 shadow-lg shadow-black/50">
        {navItems.map((item, idx) => (
          <a
            key={idx}
            href={`#${item.toLowerCase().replace(" ", "-")}`}
            style={{
              color: hoveredIdx === idx ? "#E1E0CC" : "rgba(225, 224, 204, 0.8)",
            }}
            onMouseEnter={() => setHoveredIdx(idx)}
            onMouseLeave={() => setHoveredIdx(null)}
            className="text-[10px] sm:text-xs md:text-sm font-medium transition-colors duration-200 whitespace-nowrap cursor-pointer"
          >
            {item}
          </a>
        ))}
      </div>
    </nav>
  );
}

function HeroSection() {
  return (
    <section className="h-screen w-full p-4 md:p-6 bg-black relative">
      <div className="relative w-full h-full rounded-2xl md:rounded-[2rem] overflow-hidden flex flex-col justify-between">
        {/* Background Video */}
        <video
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Noise overlay */}
        <div className="absolute inset-0 noise-overlay opacity-[0.7] mix-blend-overlay pointer-events-none" />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60 pointer-events-none" />

        {/* Navbar */}
        <Navbar />

        {/* Space filler for the top */}
        <div />

        {/* Hero Content (bottom-aligned) */}
        <div className="w-full p-6 md:p-12 z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-end">
            {/* Left 8 columns for heading */}
            <div className="lg:col-span-8">
              <h1
                className="text-[26vw] sm:text-[24vw] md:text-[22vw] lg:text-[20vw] xl:text-[19vw] 2xl:text-[20vw] font-medium leading-[0.85] tracking-[-0.07em]"
                style={{ color: "#E1E0CC" }}
              >
                <WordsPullUp text="Prisma" showAsterisk={true} />
              </h1>
            </div>

            {/* Right 4 columns for text + button */}
            <div className="lg:col-span-4 flex flex-col gap-6 md:gap-8 items-start">
              {/* Description Paragraph */}
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  delay: 0.5,
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="text-primary/70 text-xs sm:text-sm md:text-base leading-[1.2]"
              >
                Prisma is an intelligent, AI-powered learning workspace that instantly transforms
                complex topics into structured, video-curated courses. We break down the barriers of
                traditional curriculum planning, empowering you to master any subject at your own pace.
              </motion.p>

              {/* CTA Button */}
              <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  delay: 0.7,
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group flex items-center bg-primary rounded-full pl-6 pr-2 py-2 text-black font-medium text-sm sm:text-base transition-all duration-300 gap-2 hover:gap-3 cursor-pointer"
              >
                <span>Join the lab</span>
                <span className="bg-black rounded-full w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                  <ArrowRight className="w-5 h-5" style={{ color: "#DEDBC8" }} />
                </span>
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  const segments = [
    { text: "I am Marcus Chen, ", className: "font-normal" },
    { text: "a self-taught director. ", className: "italic font-serif" },
    {
      text: "I have skills in color grading, visual effects, and narrative design.",
      className: "font-normal",
    },
  ];

  return (
    <section className="bg-black py-24 px-4 md:px-8 flex justify-center items-center">
      <div className="bg-[#101010] rounded-3xl p-8 md:p-16 max-w-6xl w-full text-center flex flex-col items-center gap-8 shadow-2xl">
        {/* Label */}
        <span className="text-primary text-[10px] sm:text-xs uppercase tracking-widest font-semibold">
          Visual arts
        </span>

        {/* Heading */}
        <div
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl max-w-3xl mx-auto leading-[0.95] sm:leading-[0.9] font-medium tracking-tight"
          style={{ color: "#E1E0CC" }}
        >
          <WordsPullUpMultiStyle segments={segments} />
        </div>

        {/* Paragraph with Scroll-linked reveal */}
        <ScrollRevealParagraph
          text="Over the last seven years, I have worked with Parallax, a Berlin-based production house that crafts cinema, series, and Noir Studio in Paris. Together, we have created work that has earned international acclaim at several major festivals."
          className="text-[#DEDBC8] text-xs sm:text-sm md:text-base max-w-2xl mx-auto leading-relaxed mt-4"
        />
      </div>
    </section>
  );
}

function FeaturesSection() {
  const headerSegments = [
    { text: "Studio-grade workflows for visionary creators. ", className: "font-normal" },
    { text: "Built for pure vision. Powered by art.", className: "text-gray-500 font-normal" },
  ];

  const gridRef = useRef(null);
  const isGridInView = useInView(gridRef, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section className="min-h-screen bg-black py-24 px-4 md:px-8 relative overflow-hidden">
      {/* Background noise filter */}
      <div className="absolute inset-0 bg-noise opacity-[0.15] pointer-events-none" />

      {/* Header */}
      <div className="max-w-6xl mx-auto text-center mb-16 px-4">
        <div
          className="text-xl sm:text-2xl md:text-3xl lg:text-4xl max-w-3xl mx-auto leading-snug"
          style={{ color: "#E1E0CC" }}
        >
          <WordsPullUpMultiStyle segments={headerSegments} />
        </div>
      </div>

      {/* 4-column card grid */}
      <motion.div
        ref={gridRef}
        variants={containerVariants}
        initial="hidden"
        animate={isGridInView ? "visible" : "hidden"}
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:h-[480px] gap-3 sm:gap-2 md:gap-1"
      >
        {/* Card 1 - Video Card */}
        <motion.div
          variants={cardVariants}
          className="relative rounded-2xl overflow-hidden h-[350px] lg:h-full flex flex-col justify-end p-6 group border border-neutral-900"
        >
          <video
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_133058_0504132a-0cf3-4450-a370-8ea3b05c95d4.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
          <h3 className="relative text-lg font-medium text-[#E1E0CC] z-10">
            Your creative canvas.
          </h3>
        </motion.div>

        {/* Card 2 - Project Storyboard */}
        <motion.div
          variants={cardVariants}
          className="bg-[#212121] rounded-2xl p-6 flex flex-col justify-between h-[350px] lg:h-full group hover:bg-[#252525] transition-all duration-300 border border-neutral-800"
        >
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-start">
              <img
                src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171918_4a5edc79-d78f-4637-ac8b-53c43c220606.png&w=1280&q=85"
                alt="Storyboard Icon"
                className="w-10 h-10 sm:w-12 sm:h-12 rounded object-cover"
              />
              <span className="text-gray-500 font-mono text-sm">01</span>
            </div>
            <h3 className="text-lg font-medium text-[#E1E0CC] mt-2">Project Storyboard.</h3>

            <ul className="flex flex-col gap-2 mt-2">
              {[
                "Shot structure planning",
                "Visual asset tracking",
                "Multi-user collaboration",
                "Cinematic preview rendering",
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-2 text-xs sm:text-sm">
                  <Check className="w-4 h-4 text-primary shrink-0" />
                  <span className="text-gray-400">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <a
            href="#"
            className="flex items-center gap-1 text-xs sm:text-sm text-[#E1E0CC] font-medium mt-4 group/link self-start"
          >
            <span>Learn more</span>
            <ArrowRight className="w-4 h-4 transform -rotate-45 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
          </a>
        </motion.div>

        {/* Card 3 - Smart Critiques */}
        <motion.div
          variants={cardVariants}
          className="bg-[#212121] rounded-2xl p-6 flex flex-col justify-between h-[350px] lg:h-full group hover:bg-[#252525] transition-all duration-300 border border-neutral-800"
        >
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-start">
              <img
                src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171741_ed9845ab-f5b2-4018-8ce7-07cc01823522.png&w=1280&q=85"
                alt="Critiques Icon"
                className="w-10 h-10 sm:w-12 sm:h-12 rounded object-cover"
              />
              <span className="text-gray-500 font-mono text-sm">02</span>
            </div>
            <h3 className="text-lg font-medium text-[#E1E0CC] mt-2">Smart Critiques.</h3>

            <ul className="flex flex-col gap-2 mt-2">
              {[
                "Real-time AI analysis",
                "Creative director notes",
                "Tool and NLE integrations",
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-2 text-xs sm:text-sm">
                  <Check className="w-4 h-4 text-primary shrink-0" />
                  <span className="text-gray-400">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <a
            href="#"
            className="flex items-center gap-1 text-xs sm:text-sm text-[#E1E0CC] font-medium mt-4 group/link self-start"
          >
            <span>Learn more</span>
            <ArrowRight className="w-4 h-4 transform -rotate-45 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
          </a>
        </motion.div>

        {/* Card 4 - Immersion Capsule */}
        <motion.div
          variants={cardVariants}
          className="bg-[#212121] rounded-2xl p-6 flex flex-col justify-between h-[350px] lg:h-full group hover:bg-[#252525] transition-all duration-300 border border-neutral-800"
        >
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-start">
              <img
                src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171809_f56666dc-c099-4778-ad82-9ad4f209567b.png&w=1280&q=85"
                alt="Immersion Icon"
                className="w-10 h-10 sm:w-12 sm:h-12 rounded object-cover"
              />
              <span className="text-gray-500 font-mono text-sm">03</span>
            </div>
            <h3 className="text-lg font-medium text-[#E1E0CC] mt-2">Immersion Capsule.</h3>

            <ul className="flex flex-col gap-2 mt-2">
              {[
                "Notification silencing",
                "Ambient soundscapes",
                "Schedule syncing",
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-2 text-xs sm:text-sm">
                  <Check className="w-4 h-4 text-primary shrink-0" />
                  <span className="text-gray-400">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <a
            href="#"
            className="flex items-center gap-1 text-xs sm:text-sm text-[#E1E0CC] font-medium mt-4 group/link self-start"
          >
            <span>Learn more</span>
            <ArrowRight className="w-4 h-4 transform -rotate-45 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="bg-black text-[#E1E0CC] min-h-screen">
      <HeroSection />
      <AboutSection />
      <FeaturesSection />
    </div>
  );
}
