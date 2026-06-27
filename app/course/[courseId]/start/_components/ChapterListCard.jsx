import React from "react";
import { HiOutlineClock } from "react-icons/hi2";

function ChapterListCard({ chapter, index }) {
  return (
    <div className="flex gap-4 p-4 border-b border-neutral-900 items-center select-none">
      <div className="shrink-0">
        <h2 className="flex items-center justify-center bg-primary text-black font-bold rounded-full w-8 h-8 text-center text-sm shadow-sm">
          {index + 1}
        </h2>
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-xs sm:text-sm text-neutral-300 leading-tight truncate group-hover:text-white transition-colors duration-200">
          {chapter?.ChapterName}
        </h3>
        <h4 className="flex items-center gap-1 text-[10px] sm:text-xs text-neutral-500 mt-1 uppercase font-mono">
          <HiOutlineClock className="w-3.5 h-3.5" />
          <span>{chapter?.Duration}</span>
        </h4>
      </div>
    </div>
  );
}

export default ChapterListCard;
