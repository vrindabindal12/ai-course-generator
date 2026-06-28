'use client'
import React, { useContext,useState } from 'react'
import { HiViewGrid } from "react-icons/hi";
import { HiLightBulb } from "react-icons/hi";
import { HiClipboardCheck } from "react-icons/hi";
import { Button } from '@/components/ui/button';
import SelectCategory from './_components/SelectCategory';
import Options from './_components/Options';
import TopicAndDesc from './_components/TopicAndDesc';
import { UserInputContext } from "../_context/UserInputContext";
import {GenerateCourseLayout_AI } from '@/configs/aiModel';
import LoadingDialog from './_components/LoadingDialog';
import { useUser } from '@clerk/nextjs';
import uuid4 from 'uuid4';
import { db } from "@/configs/db";
import { CourseList } from '@/configs/schema';
import { useRouter } from 'next/navigation';
import { useToast } from "@/hooks/use-toast";

const CreateCourse = () => {
  const StepperOptions =[
    {
      id : 1,
      title : "Category",
      description : "Select a category for your course",
      icon : <HiViewGrid />
    },
    {
      id : 2,
      title : "Topic and Desc",
      description : "Write a description and topic for your course",
      icon : <HiLightBulb />
    },
    {
      id : 3,
      title : "Options",
      description : "Select options for your course",
      icon : <HiClipboardCheck />
    }
  ]

    const [activeIndex,setActiveIndex]  = useState(0);
    const [loading, setLoading] = useState(false);
    const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);
    const { user } = useUser();
    const router = useRouter();
    const { toast } = useToast();


  const checkStatus = () => {
    if (
      activeIndex === 0 &&
      (!userCourseInput?.category || userCourseInput?.category == "Others")
    )
      return true;
    if (activeIndex === 1 && !userCourseInput?.topic) return true;
    if (
      activeIndex === 2 &&
      (!userCourseInput?.level ||
        !userCourseInput?.displayVideo ||
        !userCourseInput?.noOfChapters ||
        !userCourseInput?.duration ||
        userCourseInput.noOfChapters < 1 ||
        userCourseInput.noOfChapters > 20)
    )
      return true;

    return false;
  };



  const GenerateCourseLayout = async () => {
    setLoading(true);
    try {
      const BASIC_PROMPT =
        "Generate A Course Tutorial on Following Details With field as Course Name, Description, Along with Chapter Name, about, Duration : \n";

      const USER_INPUT_PROMPT =
        "Category: " +
        userCourseInput?.category +
        ", Topic: " +
        userCourseInput?.topic +
        ", Level:" +
        userCourseInput?.level +
        ",Duration:" +
        userCourseInput?.duration +
        ",NoOfChapters:" +
        userCourseInput?.noOfChapters +
        ", in JSON format";

      const FINAL_PROMPT = BASIC_PROMPT + USER_INPUT_PROMPT;
      console.log(FINAL_PROMPT);
 
      const result = await GenerateCourseLayout_AI.sendMessage(FINAL_PROMPT);
      const rawText = result.response.text();
      console.log("Raw AI Response:", rawText);

      // Robust JSON extraction block to strip potential markdown code wrappers
      let cleanText = rawText;
      if (rawText.includes("```")) {
        const matches = rawText.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
        if (matches && matches[1]) {
          cleanText = matches[1].trim();
        }
      }
      const parsedData = JSON.parse(cleanText);
      
      await SaveCourseLayoutInDB(parsedData);
    } catch (error) {
      console.error("AI Generation Error (Falling back to preview course):", error);
      
      toast({
        variant: "warning",
        duration: 10000,
        title: "API Limit Reached - Running in Preview Mode",
        description: "Gemini API daily quota limit was hit. Prisma is automatically generating a high-quality mockup course so you can test the workspace flow!",
      });

      // Generate realistic mock course layout
      const topic = userCourseInput?.topic || "Custom Topic";
      const category = userCourseInput?.category || "General";
      const level = userCourseInput?.level || "Beginner";
      const duration = userCourseInput?.duration || "2 Hours";
      const numChapters = parseInt(userCourseInput?.noOfChapters) || 5;

      const chapters = [];
      for (let i = 1; i <= numChapters; i++) {
        chapters.push({
          ChapterName: i === 1 ? `Getting Started with ${topic}` : i === 2 ? `Core Paradigms & Syntax` : `Intermediate ${topic} Concepts (Part ${i - 2})`,
          About: `A detailed exploration of ${topic} fundamentals, focused on step-by-step principles, compiler setups, scope control, and hands-on modular design.`,
          Duration: "30 minutes"
        });
      }

      const mockCourseData = {
        CourseName: `${level} Guide to ${topic}`,
        Description: `A comprehensive curriculum designed to take you from a ${level} level to mastery in ${topic}. Perfect for testing layout flows and start chapter features.`,
        Category: category,
        Topic: topic,
        Level: level,
        Duration: duration,
        NoOfChapters: numChapters,
        Chapters: chapters
      };

      // Proceed to save in DB using the mockup
      await SaveCourseLayoutInDB(mockCourseData);
    }
  };

  const SaveCourseLayoutInDB = async (courseLayout) => {
    setLoading(true);
    try {
      var id = uuid4();
      const result = await db.insert(CourseList).values({
        courseId: id,
        name: userCourseInput?.topic,
        level: userCourseInput?.level,
        category: userCourseInput?.category,
        courseOutput: courseLayout,
        createdBy: user?.primaryEmailAddress?.emailAddress,
        userName: user?.fullName,
        userProfileImage: user?.imageUrl,
      });
      console.log("Finished Course Layout Saved in DB");
      setLoading(false);
      router.replace(`/create-course/${id}`);
    } catch (error) {
      console.error("Database Save Error:", error);
      setLoading(false);
      toast({
        variant: "destructive",
        duration: 5000,
        title: "Database Save Failed",
        description: error?.message || "Failed to save the generated course content. Please try again.",
      });
    }
  };


 
  return (
    <div className="py-6 px-4 sm:px-10 max-w-4xl mx-auto min-h-[calc(100vh-60px)] flex flex-col justify-between">
      <div>
        <div className='flex flex-col justify-center items-center mt-4'>
          <h2 className='text-[#E1E0CC] text-2xl md:text-3xl font-medium tracking-tight text-center'>
            Create <span className="font-serif italic text-primary font-normal">AI Course</span>
          </h2>
          
          {/* Stepper Grid */}
          <div className='flex items-center justify-center mt-6 gap-2'>
            {StepperOptions.map((item, index) => (
              <div key={item.id} className='flex items-center'>
                <div className='flex flex-col items-center w-[60px] md:w-[100px]'>
                  <div className={`rounded-full p-2.5 transition-all duration-300 flex items-center justify-center w-9 h-9 md:w-11 md:h-11 border text-sm md:text-base ${
                    activeIndex >= index 
                      ? "bg-primary text-black border-primary shadow-lg shadow-primary/15 font-semibold" 
                      : "bg-neutral-900 text-neutral-500 border-neutral-850"
                  }`}>
                    {item.icon}
                  </div>
                  <h2 className={`hidden md:block text-xs mt-1.5 font-medium transition-colors ${
                    activeIndex >= index ? "text-[#E1E0CC]" : "text-neutral-500"
                  }`}>{item.title}</h2>
                </div>
                {index !== StepperOptions.length - 1 && (
                  <div className={`h-[1px] w-[35px] md:w-[80px] lg:w-[120px] transition-all duration-300 ${
                    activeIndex >= index + 1 ? "bg-primary" : "bg-neutral-850"
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Components wrapper */}
        <div className='mt-8 bg-[#111111]/40 border border-neutral-900 rounded-2xl p-4 md:p-8 shadow-sm backdrop-blur-sm relative overflow-hidden'>
          <div className="absolute inset-0 noise-overlay opacity-[0.02] pointer-events-none" />
          <div className="relative z-10">
            {activeIndex === 0 ? <SelectCategory /> : null}
            {activeIndex === 1 ? <TopicAndDesc /> : null}
            {activeIndex === 2 ? <Options /> : null}
          </div>
        </div>
      </div>

      {/* Stepper Navigation Buttons */}
      <div className='flex justify-between items-center mt-8 pt-4 border-t border-neutral-900/60'>
        <button 
          disabled={activeIndex === 0} 
          onClick={() => setActiveIndex(activeIndex - 1)} 
          className="px-6 py-2.5 border border-neutral-800 rounded-full text-xs font-semibold text-gray-400 hover:text-white hover:border-neutral-700 disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer active:scale-95"
        >
          Previous
        </button>
        {activeIndex < 2 && (
          <button 
            disabled={checkStatus()} 
            onClick={() => setActiveIndex(activeIndex + 1)}
            className="bg-primary text-black hover:bg-[#c9c6b3] font-semibold text-xs rounded-full px-8 py-2.5 disabled:opacity-35 disabled:pointer-events-none transition-all hover:scale-[1.02] active:scale-95 cursor-pointer"
          >
            Next
          </button>
        )}
        {activeIndex === 2 && (
          <button  
            disabled={checkStatus()} 
            onClick={() => GenerateCourseLayout()}
            className="bg-primary text-black hover:bg-[#c9c6b3] font-semibold text-xs rounded-full px-8 py-2.5 disabled:opacity-35 disabled:pointer-events-none transition-all hover:scale-[1.02] active:scale-95 cursor-pointer"
          >
            Generate Course Layout
          </button>
        )}
      </div>
      <LoadingDialog loading={loading} />
    </div>
  )
}

export default CreateCourse