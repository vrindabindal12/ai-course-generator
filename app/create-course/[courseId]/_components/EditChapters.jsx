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
import { HiPencilSquare } from "react-icons/hi2";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { db } from "@/configs/db";
import { CourseList } from "@/configs/schema";
import { eq } from "drizzle-orm";
import { useToast } from "@/hooks/use-toast";

function EditChapters({ course, index, refreshData }) {
  const Chapters = course?.courseOutput?.Chapters;
  const { toast } = useToast();
  const [chapterName, setChapterName] = useState();
  const [about, setAbout] = useState();

  useEffect(() => {
    setChapterName(Chapters[index]?.ChapterName);
    setAbout(Chapters[index]?.About);
  }, [course]);

  const onUpdateHandler = async () => {
    try {
      course.courseOutput.Chapters[index].ChapterName = chapterName;
      course.courseOutput.Chapters[index].About = about;

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
        title: "Chapter Updated Successfully!",
        description: "Chapter has been updated successfully!",
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
            <HiPencilSquare className="w-4 h-4" />
          </button>
        </DialogTrigger>
        <DialogContent className="bg-[#151515] border-neutral-900 text-[#E1E0CC] max-w-md rounded-2xl p-6">
          <DialogHeader>
            <DialogTitle className="text-xl font-medium tracking-tight text-[#E1E0CC]">
              Edit Chapter
            </DialogTitle>
            <DialogDescription className="text-xs text-neutral-400 mt-1">
              Please update the chapter title and about description below.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 my-4">
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-1.5 block">
                Chapter Name
              </label>
              <Input
                className="bg-neutral-900 border-neutral-800 text-[#E1E0CC] focus:ring-primary focus:border-primary rounded-lg p-3 text-sm h-10 w-full"
                onChange={(e) => setChapterName(e.target.value)}
                defaultValue={Chapters[index]?.ChapterName}
              />
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-1.5 block">
                About
              </label>
              <Textarea
                className="bg-neutral-900 border-neutral-800 text-[#E1E0CC] focus:ring-primary focus:border-primary rounded-lg p-3 text-sm h-36 w-full resize-none"
                onChange={(e) => setAbout(e.target.value)}
                defaultValue={Chapters[index]?.About}
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

export default EditChapters;
