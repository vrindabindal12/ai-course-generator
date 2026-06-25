import Image from "next/image";
import React from "react";
import { HiOutlineBookOpen, HiEllipsisVertical } from "react-icons/hi2";
import DropDown from "./DropDown";
import { db } from "@/configs/db";
import { Chapters, CourseList } from "@/configs/schema";
import { eq } from "drizzle-orm";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

function CourseCard({ course, refreshData, displayUser = false }) {
  const { toast } = useToast();
  const handleOnDelete = async () => {
    try {
        // Delete Banner Image
        if (course?.courseBanner !== "/placeholder.png") {
          const filePath = course?.courseBanner
            .replace(
              "https://firebasestorage.googleapis.com/v0/b/explorer-1844f.firebasestorage.app/o/",
              ""
            );
    
          const { error: storageError } = await supabase.storage
            .from("your-bucket-name")
            .remove([decodeURIComponent(filePath)]);
    
          if (storageError) throw storageError;
        }
    
        // Delete Course
        const courseResponse = await db
          .delete(CourseList)
          .where(eq(CourseList.id, course?.id))
          .returning({ id: CourseList?.id });
    
        // Delete Chapters
        const chapterResponse = await db
          .delete(Chapters)
          .where(eq(Chapters.courseId, course?.courseId))
          .returning({ id: Chapters?.id });
    
        if (courseResponse && chapterResponse) {
          refreshData();
          toast({
            variant: "success",
            duration: 3000,
            title: "Course Deleted Successfully!",
            description: "Course has been deleted successfully!",
          });
        }
      } catch (error) {
        toast({
          variant: "destructive",
          duration: 3000,
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
        });
      }
  };

  return (
    <div className="bg-[#151515] border border-neutral-800 rounded-xl p-3 hover:scale-[1.02] hover:border-neutral-700 transition-all duration-300 cursor-pointer mt-4 shadow-lg shadow-black/30">
      <Link
        href={
          course?.publish
            ? `/course/${course.courseId}`
            : `/create-course/${course?.courseId}`
        }
      >
        <Image
          src={course?.courseBanner}
          alt="course"
          width={300}
          height={200}
          className="w-full h-[200px] object-cover rounded-lg"
        />
      </Link>

      <div className="p-2">
        <h2 className="font-medium text-lg flex justify-between items-center text-[#E1E0CC]">
          {course?.courseOutput?.CourseName}
          {!displayUser && (
            <DropDown
              courseId={course?.courseId}
              handleOnDelete={() => handleOnDelete()}
            >
              <HiEllipsisVertical className="text-gray-400 hover:text-[#E1E0CC] transition-colors" />
            </DropDown>
          )}
        </h2>

        <p className="my-1 text-xs text-gray-500 font-medium uppercase tracking-wider">{course?.category}</p>
        <div className="flex items-center justify-between mt-3">
          <h2 className="flex gap-1.5 items-center px-2 py-0.5 rounded-full bg-neutral-800 text-primary text-xs font-medium">
            <HiOutlineBookOpen className="w-3.5 h-3.5" />
            {course?.courseOutput?.NoOfChapters} Chapters
          </h2>

          {!displayUser && course?.publish == false && (
            <Link href={`/create-course/${course?.courseId}`}>
              <h2 className="rounded-full hidden md:block hover:bg-red-600 bg-red-500 text-white text-xs px-2 py-0.5 font-semibold">
                Draft
              </h2>
            </Link>
          )}
          <h2 className="rounded-full bg-neutral-800 text-primary text-xs px-2 py-0.5 font-medium">
            {course?.level}
          </h2>
        </div>
      </div>
      {displayUser && (
        <div className="flex items-center gap-2 mt-2 pl-1">
          <Image
            src={course?.userProfileImage}
            width={25}
            height={25}
            alt="user profile image"
            className="rounded-full"
          />
          <h2 className="text-xs text-gray-400">{course?.userName}</h2>
        </div>
      )}

      {!displayUser && course?.publish == false && (
        <Link href={`/create-course/${course?.courseId}`}>
          <div className="flex items-center justify-center mt-2 md:hidden">
            <h2 className="rounded-full hover:bg-red-600 bg-red-500 text-white text-xs px-2 py-0.5 font-semibold">
              Draft
            </h2>
          </div>
        </Link>
      )}
    </div>
  );
}

export default CourseCard;
