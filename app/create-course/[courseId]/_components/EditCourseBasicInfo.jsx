import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { HiMiniPencilSquare } from "react-icons/hi2";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { db } from "@/configs/db";
import { CourseList } from "@/configs/schema";
import { eq } from "drizzle-orm";
import { useToast } from "@/hooks/use-toast";

function EditCourseBasicInfo({ course, refreshData }) {
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const { toast } = useToast();

  useEffect(() => {
    setName(course?.courseOutput?.CourseName);
    setDescription(course?.courseOutput?.Description);
  }, [course]);

  const onUpdateHandler = async () => {
    try {
      course.courseOutput.CourseName = name;
      course.courseOutput.Description = description;
      const result = await db
        .update(CourseList)
        .set({ courseOutput: course?.courseOutput })
        .where(eq(CourseList?.id, course?.id))
        .returning({ id: CourseList.id });

      // console.log(result);
      refreshData(true);
      toast({
        variant: "success",
        duration: 3000,
        title: "Course Updated Successfully!",
        description: "Course has been updated successfully!",
      });
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
      <Dialog>
        <DialogTrigger asChild>
          <button className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-[#DEDBC8] hover:bg-neutral-800 hover:text-[#E1E0CC] transition-all duration-200">
            <HiMiniPencilSquare className="w-4 h-4" />
          </button>
        </DialogTrigger>
        <DialogContent className="bg-[#151515] border-neutral-900 text-[#E1E0CC] max-w-md rounded-2xl p-6">
          <DialogHeader>
            <DialogTitle className="text-xl font-medium tracking-tight text-[#E1E0CC]">
              Edit Course Title & Description
            </DialogTitle>
            <DialogDescription className="text-xs text-neutral-400 mt-1">
              Please update the course title and description below.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 my-4">
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-1.5 block">
                Course Title
              </label>
              <Input
                className="bg-neutral-900 border-neutral-800 text-[#E1E0CC] focus:ring-primary focus:border-primary rounded-lg p-3 text-sm h-10 w-full"
                onChange={(e) => setName(e.target.value)}
                defaultValue={course?.courseOutput?.CourseName}
              />
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-1.5 block">
                Description
              </label>
              <Textarea
                className="bg-neutral-900 border-neutral-800 text-[#E1E0CC] focus:ring-primary focus:border-primary rounded-lg p-3 text-sm h-36 w-full resize-none"
                onChange={(e) => setDescription(e.target.value)}
                defaultValue={course?.courseOutput?.Description}
              />
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <button
                onClick={() => onUpdateHandler()}
                className="bg-[#DEDBC8] hover:bg-[#E1E0CC] text-black font-semibold text-xs sm:text-sm rounded-full px-6 py-2.5 transition-all duration-300 hover:scale-105 active:scale-95 shadow-md flex items-center justify-center"
              >
                Update
              </button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default EditCourseBasicInfo;
