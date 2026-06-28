import { UserInputContext } from "@/app/_context/UserInputContext";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React, { useContext } from "react";

import { Lightbulb, FileText } from "lucide-react";

function TopicDescription() {
  const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);

  const handleInputChange = (fieldName, value) => {
    setUserCourseInput((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Input Topic */}
      <div>
        <label className="mb-2 block select-none">
          <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-neutral-400">
            <Lightbulb className="w-4 h-4 text-primary shrink-0" />
            Write the topic for which you want to generate a course (e.g., Java Course, Web Dev, SDE Interview etc.) :
          </span>
        </label>
        <Input
          placeholder="Topic"
          className="h-11 text-sm bg-neutral-900 border-neutral-800 text-[#E1E0CC] placeholder-neutral-600 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 focus-visible:ring-0 focus-visible:ring-offset-0"
          defaultValue={userCourseInput?.topic}
          onChange={(e) => handleInputChange("topic", e.target.value)}
        />
      </div>
      <div>
        <label className="mb-2 block select-none">
          <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-neutral-400">
            <FileText className="w-4 h-4 text-primary shrink-0" />
            Tell us more about your course, what you want to include in the course (Optional)
          </span>
        </label>
        <Textarea
          placeholder="About your course"
          className="h-20 text-sm bg-neutral-900 border-neutral-800 text-[#E1E0CC] placeholder-neutral-600 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 focus-visible:ring-0 focus-visible:ring-offset-0"
          defaultValue={userCourseInput?.description}
          onChange={(e) => handleInputChange("description", e.target.value)}
        />
      </div>
    </div>
  );
}

export default TopicDescription;
