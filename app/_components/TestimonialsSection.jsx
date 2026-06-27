"use client";

import React from "react";

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Sarah Jenkins",
      role: "Software Engineer",
      initials: "SJ",
      gradient: "from-purple-500 to-indigo-500",
      quote: "Prisma transformed how I learn. I wanted to understand Docker orchestration, and in 30 seconds I had a 5-chapter course synced with high-quality videos. The code templates are incredibly useful!",
    },
    {
      name: "David Chen",
      role: "Product Designer",
      initials: "DC",
      gradient: "from-teal-500 to-emerald-500",
      quote: "The AI curriculum planning is spot on. It avoids the fluff and targets exactly what you need. Uploading custom covers and tracking topics in a clean dark mode UI feels premium.",
    },
    {
      name: "Elena Rostova",
      role: "Computer Science Student",
      initials: "ER",
      gradient: "from-orange-500 to-amber-500",
      quote: "As a student, I waste so much time sorting through long playlists. Prisma finds the exact clips and maps them to clear markdown text. It's like having a custom textbook built for me.",
    },
    {
      name: "Dr. Marcus Vance",
      role: "University Professor",
      initials: "MV",
      gradient: "from-blue-500 to-cyan-500",
      quote: "I recommend Prisma to my students for supplementary study. The Gemini-generated outlines are pedagogically sound and adapt well to different skill levels.",
    },
    {
      name: "Liam O'Connor",
      role: "Self-taught Developer",
      initials: "LO",
      gradient: "from-pink-500 to-rose-500",
      quote: "I went from zero coding knowledge to building React web apps in weeks. The structure is what makes the difference. Video sync combined with detailed explanations is a game changer.",
    },
    {
      name: "Sophia Rodriguez",
      role: "Growth Marketer",
      initials: "SR",
      gradient: "from-yellow-500 to-orange-500",
      quote: "I created a custom growth hacking curriculum in seconds. The flexibility to adjust chapters and levels allowed me to skip basic concepts and focus only on advanced automation.",
    }
  ];

  // Duplicate the array to ensure smooth continuous marquee looping
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <section id="testimonials" className="bg-black py-20 border-t border-neutral-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none" />
      
      {/* Dynamic Marquee Styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-infinite {
          display: flex;
          width: max-content;
          animation: marquee 35s linear infinite;
        }
        .animate-marquee-infinite:hover {
          animation-play-state: paused;
        }
      `}} />

      <div className="max-w-6xl mx-auto px-4 md:px-8 mb-12">
        <span className="text-primary text-[10px] sm:text-xs uppercase tracking-widest font-semibold block text-center mb-3">
          Community Feedback
        </span>
        <h2 className="text-2xl md:text-4xl font-medium text-center text-[#E1E0CC] mb-4 tracking-tight">
          Loved by thousands of learners.
        </h2>
        <p className="text-gray-400 text-center max-w-md mx-auto text-xs sm:text-sm">
          See how students, developers, and creators are bypassing tutorial hell using custom AI-curated pathways.
        </p>
      </div>

      {/* Marquee Viewport with Blur Fades */}
      <div className="relative w-full overflow-hidden">
        {/* Left Side Shadow Gradient */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-black via-black/60 to-transparent z-10 pointer-events-none" />
        
        {/* Right Side Shadow Gradient */}
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-black via-black/60 to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee-infinite flex gap-6 py-4">
          {duplicatedTestimonials.map((item, idx) => (
            <div
              key={idx}
              className="w-[280px] sm:w-[320px] md:w-[350px] bg-[#101010] border border-neutral-800 rounded-2xl p-6 hover:border-neutral-700 transition-all duration-300 flex flex-col justify-between shrink-0 select-none cursor-pointer"
            >
              <div>
                {/* Rating stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, starIdx) => (
                    <svg
                      key={starIdx}
                      className="w-4 h-4 text-amber-400 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                
                {/* Quote */}
                <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-6 italic">
                  "{item.quote}"
                </p>
              </div>

              {/* User Identity info */}
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-full bg-gradient-to-tr ${item.gradient} flex items-center justify-center text-xs font-semibold text-white select-none`}>
                  {item.initials}
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold text-[#E1E0CC]">{item.name}</h4>
                  <p className="text-gray-500 text-[10px] sm:text-xs">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
