"use client";
import { db } from "@/configs/db";
import { CourseList } from "@/configs/schema";
import React, { useEffect, useState } from "react";
import CourseCard from "../_components/CourseCard";
import { Button } from "@/components/ui/button";
import { desc, eq } from "drizzle-orm";
import { useToast } from "@/hooks/use-toast";

function Explore() {
  const [courseList, setCourseList] = useState([]);
  // const [pageIndex, setPageIndex] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    GetAllCourses();
  }, []); // set dependency array value to pageIndex

  const GetAllCourses = async () => {
    // const result = await db
    //   .select()
    //   .from(CourseList)
    //   .limit(9)
    //   .offset(pageIndex * 9);

    try {
      const result = await db
        .select()
        .from(CourseList)
        .where(eq(CourseList.publish, true))
        .orderBy(desc(CourseList.id));
      // console.log(result);
      setCourseList(result);
    } catch (error) {
      // console.log(error);
      toast({
        variant: "destructive",
        duration: 3000,
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    }
  };
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-medium tracking-tight text-[#E1E0CC]">
          Explore <span className="font-serif italic text-primary font-normal">Community Courses</span>
        </h1>
        <p className="text-sm text-neutral-400 mt-2">
          Discover and learn from AI-curated workspaces created by developers and thinkers around the world.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courseList.length > 0
          ? courseList?.map((course, index) => (
              <CourseCard
                key={index}
                course={course}
                refreshData={() => GetAllCourses()}
                displayUser={true}
              />
            ))
          : [1, 2, 3, 4, 5, 6].map((item, index) => (
              <div
                key={index}
                className="bg-[#151515] border border-neutral-900 rounded-xl p-3 animate-pulse"
              >
                <div className="w-full h-[200px] bg-[#212121] rounded-lg"></div>
                <div className="p-2">
                  <div className="h-5 bg-[#212121] rounded w-3/4 mb-3 mt-2"></div>
                  <div className="h-3 bg-[#212121] rounded w-1/2 mb-4"></div>
                  <div className="flex items-center justify-between">
                    <div className="h-5 bg-[#212121] rounded w-1/3"></div>
                    <div className="h-5 bg-[#212121] rounded w-1/4"></div>
                  </div>
                </div>
              </div>
            ))}
      </div>

      {/* <div className="flex justify-between mt-5">
        <Button
          disabled={pageIndex == 0}
          onClick={() => setPageIndex(pageIndex - 1)}
        >
          Previous Page
        </Button>
        <Button onClick={() => setPageIndex(pageIndex + 1)}>Next Page</Button>
      </div> */}
    </div>
  );
}

export default Explore;
