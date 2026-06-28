"use client";
import { UserInputContext } from "@/app/_context/UserInputContext";
import CategoryList from "@/app/_shared/CategoryList";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useContext, useState } from "react";
import SpotlightCard from "../../_components/SpotlightCard";
import { LayoutGrid, Code, Globe, MessageSquare, Server, HelpCircle } from "lucide-react";

function SelectCategory() {
  const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);
  const [inputCategory, setInputCategory] = useState("");

  const handleCategoryChange = (category, active) => {
    setUserCourseInput((prev) => ({
      ...prev,
      category: category,
      activeInput: active,
    }));
  };

  const getCategoryIcon = (categoryName) => {
    switch (categoryName) {
      case "Programming":
        return <Code className="w-6 h-6 text-primary" />;
      case "Development":
        return <Globe className="w-6 h-6 text-primary" />;
      case "Interview":
        return <MessageSquare className="w-6 h-6 text-primary" />;
      case "Deployment":
        return <Server className="w-6 h-6 text-primary" />;
      default:
        return <HelpCircle className="w-6 h-6 text-primary" />;
    }
  };

  return (
    <div>
      <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-4 flex items-center gap-1.5 select-none">
        <LayoutGrid className="w-4 h-4 text-primary" />
        Select the Course Category
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {CategoryList.map((item, index) => (
          <SpotlightCard
            key={item.id}
            className={`flex flex-col p-4 border items-center justify-center rounded-xl transition-all duration-300 cursor-pointer text-center select-none ${
              userCourseInput?.category === item.name
                ? "border-primary bg-primary/10 text-[#E1E0CC] shadow-md shadow-primary/5"
                : "border-neutral-850 bg-[#161616]/30 text-neutral-400 hover:border-neutral-700 hover:text-[#E1E0CC]"
            }`}
            onClick={() => handleCategoryChange(item.name, false)}
          >
            <div className="relative z-20 flex flex-col items-center justify-center">
              <div className="mb-2">
                {getCategoryIcon(item.name)}
              </div>
              <h3 className="text-xs font-medium tracking-tight">{item.name}</h3>
            </div>
          </SpotlightCard>
        ))}

        {userCourseInput?.category === "Others" && (
          <div
            className="flex gap-2 p-2 border items-center justify-between rounded-xl border-neutral-850 bg-[#161616]/30 col-span-full mt-2"
          >
            <Input
              placeholder="Enter the category"
              className="h-10 text-sm bg-neutral-900 border-neutral-800 text-[#E1E0CC] placeholder-neutral-600 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 focus-visible:ring-0 focus-visible:ring-offset-0"
              onChange={(e) => setInputCategory(e.target.value)}
            />
            <button
              disabled={inputCategory.length <= 0}
              onClick={() => handleCategoryChange(inputCategory, true)}
              className="bg-primary hover:bg-[#c9c6b3] text-black font-semibold text-xs rounded-lg px-4 py-2.5 disabled:opacity-30 disabled:pointer-events-none transition-all duration-200 cursor-pointer shrink-0"
            >
              Save
            </button>
          </div>
        )}

        {userCourseInput?.activeInput && (
          <div
            className="flex flex-col p-4 border items-center justify-center rounded-xl border-primary bg-primary/10 text-[#E1E0CC] col-span-full mt-2"
          >
            <HelpCircle className="w-6 h-6 text-primary mb-2" />
            <h3 className="text-xs font-medium">{userCourseInput?.category}</h3>
          </div>
        )}
      </div>
    </div>
  );
}

export default SelectCategory;
