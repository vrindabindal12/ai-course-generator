import React, { useContext } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; 
import { Input } from "@/components/ui/input";
import { UserInputContext } from "@/app/_context/UserInputContext";
import { GraduationCap, Clock, Video, BookOpen } from "lucide-react";

function Options() {
  const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);

  const handleInputChange = (fieldName, value) => {
    setUserCourseInput((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 select-none">
        <div>
          <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-2">
            <GraduationCap className="w-4 h-4 text-primary shrink-0" />
            Difficulty Level
          </label>
          <Select
            onValueChange={(value) => handleInputChange("level", value)}
            defaultValue={userCourseInput?.level}
          >
            <SelectTrigger className="w-full bg-neutral-900 border-neutral-800 text-[#E1E0CC] h-11 text-sm rounded-xl focus:border-primary/50 focus:ring-1 focus:ring-primary/20 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent className="bg-[#151515] border border-neutral-800 text-[#E1E0CC]">
              <SelectItem value="Beginner" className="hover:bg-neutral-800 focus:bg-neutral-800 focus:text-white cursor-pointer">Beginner</SelectItem>
              <SelectItem value="Intermediate" className="hover:bg-neutral-800 focus:bg-neutral-800 focus:text-white cursor-pointer">Intermediate</SelectItem>
              <SelectItem value="Advance" className="hover:bg-neutral-800 focus:bg-neutral-800 focus:text-white cursor-pointer">Advance</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-2">
            <Clock className="w-4 h-4 text-primary shrink-0" />
            Course Duration
          </label>
          <Select
            defaultValue={userCourseInput?.duration}
            onValueChange={(value) => handleInputChange("duration", value)}
          >
            <SelectTrigger className="w-full bg-neutral-900 border-neutral-800 text-[#E1E0CC] h-11 text-sm rounded-xl focus:border-primary/50 focus:ring-1 focus:ring-primary/20 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent className="bg-[#151515] border border-neutral-800 text-[#E1E0CC]">
              <SelectItem value="1 Hours" className="hover:bg-neutral-800 focus:bg-neutral-800 focus:text-white cursor-pointer">1 Hours</SelectItem>
              <SelectItem value="2 Hours" className="hover:bg-neutral-800 focus:bg-neutral-800 focus:text-white cursor-pointer">2 Hours</SelectItem>
              <SelectItem value="More than 3 Hours" className="hover:bg-neutral-800 focus:bg-neutral-800 focus:text-white cursor-pointer">
                More than 3 Hours
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-2">
            <Video className="w-4 h-4 text-primary shrink-0" />
            Add Video
          </label>
          <Select
            defaultValue={userCourseInput?.displayVideo}
            onValueChange={(value) => handleInputChange("displayVideo", value)}
          >
            <SelectTrigger className="w-full bg-neutral-900 border-neutral-800 text-[#E1E0CC] h-11 text-sm rounded-xl focus:border-primary/50 focus:ring-1 focus:ring-primary/20 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent className="bg-[#151515] border border-neutral-800 text-[#E1E0CC]">
              <SelectItem value="Yes" className="hover:bg-neutral-800 focus:bg-neutral-800 focus:text-white cursor-pointer">Yes</SelectItem>
              <SelectItem value="No" className="hover:bg-neutral-800 focus:bg-neutral-800 focus:text-white cursor-pointer">No</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-2">
            <BookOpen className="w-4 h-4 text-primary shrink-0" />
            No of Chapters
          </label>
          <Input
            type="number"
            placeholder="No of Chapters (Between 1-20)"
            defaultValue={userCourseInput?.noOfChapters}
            className="h-11 text-sm bg-neutral-900 border-neutral-800 text-[#E1E0CC] placeholder-neutral-600 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 focus-visible:ring-0 focus-visible:ring-offset-0"
            onChange={(e) => handleInputChange("noOfChapters", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

export default Options;
