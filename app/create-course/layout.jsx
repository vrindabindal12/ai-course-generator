"use client";
import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { UserInputContext } from "../_context/UserInputContext";

function CreateCourseLayout({ children }) {
  const [userCourseInput, setUserCourseInput] = useState([]);
  return (
    <div className="bg-black min-h-screen text-[#E1E0CC]">
      <UserInputContext.Provider
        value={{ userCourseInput, setUserCourseInput }}
      >
        <div className="flex justify-between items-center px-6 py-3 border-b border-neutral-900 bg-black/80 backdrop-blur-md sticky top-0 z-50 h-[60px]">
          <div className="flex items-center gap-2.5">
            <Link
              href="/dashboard"
              className="text-gray-400 hover:text-white transition-colors flex items-center gap-1.5 text-sm font-medium"
              title="Back to Dashboard"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden sm:inline">Back</span>
            </Link>
            <div className="h-4 w-[1px] bg-neutral-850 hidden sm:block" />
            <Link href="/">
              <div className="text-xl font-bold text-[#E1E0CC] tracking-wide flex items-center select-none cursor-pointer">
                Prisma<span className="text-primary text-xs ml-0.5 align-super">*</span>
              </div>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>

        {/* Content Area */}
        <div className="relative">
          {/* Background noise filter to unify aesthetics */}
          <div className="fixed inset-0 bg-noise opacity-[0.04] pointer-events-none z-0" />
          <div className="relative z-10">{children}</div>
        </div>
      </UserInputContext.Provider>
    </div>
  );
}

export default CreateCourseLayout;
